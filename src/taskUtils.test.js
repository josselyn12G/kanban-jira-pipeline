import { describe, it, expect } from 'vitest';
import { createTask, updateTask, deleteTask, moveTask, getTasksByStatus } from './taskUtils';

describe('taskUtils', () => {
  it('crea una tarea en estado Pendiente', () => {
    const tasks = createTask([], { title: '  Diseñar login  ', description: 'UI' });
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Diseñar login');
    expect(tasks[0].status).toBe('pending');
  });

  it('no permite crear una tarea sin título', () => {
    expect(() => createTask([], { title: '   ' })).toThrow('El título es obligatorio');
  });

  it('edita el título y la descripción de una tarea', () => {
    const [task] = createTask([], { title: 'Original' });
    const [edited] = updateTask([task], task.id, { title: 'Editada', description: 'Nueva' });
    expect(edited.title).toBe('Editada');
    expect(edited.description).toBe('Nueva');
  });

  it('elimina una tarea', () => {
    const tasks = createTask(createTask([], { title: 'A' }), { title: 'B' });
    const result = deleteTask(tasks, tasks[0].id);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('B');
  });

  it('cambia el estado de una tarea', () => {
    const [task] = createTask([], { title: 'Mover' });
    const moved = moveTask([task], task.id, 'in-progress');
    expect(getTasksByStatus(moved, 'in-progress')).toHaveLength(1);
    expect(getTasksByStatus(moved, 'pending')).toHaveLength(0);
  });

  it('rechaza un estado inválido', () => {
    const [task] = createTask([], { title: 'X' });
    expect(() => moveTask([task], task.id, 'archived')).toThrow();
  });
});
