import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function addTask(user, title, dueDate) {
  await user.click(screen.getByRole('button', { name: /Nueva tarea/ }));
  await user.type(screen.getByLabelText('Título'), title);
  if (dueDate) fireEvent.change(screen.getByLabelText('Fecha límite'), { target: { value: dueDate } });
  await user.click(screen.getByRole('button', { name: 'Agregar' }));
}

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

describe('App Kanban', () => {
  beforeEach(() => localStorage.clear());

  it('muestra las tres columnas', () => {
    render(<App />);
    expect(screen.getByRole('region', { name: 'Pendiente' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'En progreso' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Completado' })).toBeInTheDocument();
  });

  it('agrega una tarea y la mueve a Completado', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Escribir informe');

    const pendiente = screen.getByRole('region', { name: 'Pendiente' });
    expect(within(pendiente).getByText('Escribir informe')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Estado de Escribir informe'), 'done');
    const completado = screen.getByRole('region', { name: 'Completado' });
    expect(within(completado).getByText('Escribir informe')).toBeInTheDocument();
  });

  it('elimina una tarea', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Temporal');
    await user.click(screen.getByRole('button', { name: 'Eliminar' }));
    await user.click(screen.getByRole('button', { name: 'Sí, eliminar' }));
    expect(screen.queryByText('Temporal')).not.toBeInTheDocument();
  });

  it('no elimina la tarea si se cancela la confirmación', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Importante');
    await user.click(screen.getByRole('button', { name: 'Eliminar' }));
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.getByText('Importante')).toBeInTheDocument();
  });

  it('edita una tarea desde el modal', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Borrador');
    await user.click(screen.getByRole('button', { name: 'Editar' }));
    const input = screen.getByLabelText('Título');
    await user.clear(input);
    await user.type(input, 'Versión final');
    await user.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(screen.getByText('Versión final')).toBeInTheDocument();
    expect(screen.queryByText('Borrador')).not.toBeInTheDocument();
  });

  it('filtra tareas con el buscador', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Login');
    await addTask(user, 'Dashboard');
    await user.type(screen.getByLabelText('Buscar tarea'), 'dash');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('enfoca el buscador con el atajo Ctrl+K', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.keyboard('{Control>}k{/Control}');
    expect(screen.getByLabelText('Buscar tarea')).toHaveFocus();
  });

  it('la vista Lista muestra las tareas en una tabla', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Revisar PR');
    await user.click(screen.getByRole('tab', { name: /Lista/ }));
    const table = screen.getByRole('table', { name: 'Lista de tareas' });
    expect(within(table).getByText('Revisar PR')).toBeInTheDocument();
  });

  it('la vista Resumen cuenta las tareas por estado', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Uno');
    await addTask(user, 'Dos');
    await user.selectOptions(screen.getByLabelText('Estado de Dos'), 'done');
    await user.click(screen.getByRole('tab', { name: /Resumen/ }));
    const summary = screen.getByRole('region', { name: 'Resumen' });
    expect(within(summary).getByText('Total de tareas').nextSibling).toHaveTextContent('2');
    expect(within(summary).getByText('Completadas').nextSibling).toHaveTextContent('1');
  });

  it('la vista Calendario ubica la tarea en su fecha límite', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Entregar informe', todayISO());
    await user.click(screen.getByRole('tab', { name: /Calendario/ }));
    const day = screen.getByRole('gridcell', { name: todayISO() });
    expect(within(day).getByRole('button', { name: 'Entregar informe' })).toBeInTheDocument();
  });
});
