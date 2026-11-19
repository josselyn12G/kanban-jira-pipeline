import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

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
    await user.type(screen.getByLabelText('Título'), 'Escribir informe');
    await user.click(screen.getByRole('button', { name: 'Agregar' }));

    const pendiente = screen.getByRole('region', { name: 'Pendiente' });
    expect(within(pendiente).getByText('Escribir informe')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Estado de Escribir informe'), 'done');
    const completado = screen.getByRole('region', { name: 'Completado' });
    expect(within(completado).getByText('Escribir informe')).toBeInTheDocument();
  });

  it('elimina una tarea', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Título'), 'Temporal');
    await user.click(screen.getByRole('button', { name: 'Agregar' }));
    await user.click(screen.getByRole('button', { name: 'Eliminar' }));
    expect(screen.queryByText('Temporal')).not.toBeInTheDocument();
  });
});
