import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function addTask(user, title) {
  await user.click(screen.getByRole('button', { name: /Nueva tarea/ }));
  await user.type(screen.getByLabelText('Título'), title);
  await user.click(screen.getByRole('button', { name: 'Agregar' }));
}

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
    expect(screen.queryByText('Temporal')).not.toBeInTheDocument();
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
    await user.type(screen.getByLabelText('Filtrar tareas'), 'dash');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});
