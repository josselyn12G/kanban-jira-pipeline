import { useCallback } from 'react';
import { STORAGE_KEY } from '../constants/task';
import { useLocalStorage } from './useLocalStorage';
import { createTask, updateTask, deleteTask, moveTask, clearCompleted } from '../utils/taskUtils';

/** Estado de las tareas + acciones CRUD, persistido en localStorage. */
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);

  const add = useCallback((data) => setTasks((prev) => createTask(prev, data)), [setTasks]);
  const update = useCallback((id, data) => setTasks((prev) => updateTask(prev, id, data)), [setTasks]);
  const remove = useCallback((id) => setTasks((prev) => deleteTask(prev, id)), [setTasks]);
  const move = useCallback((id, status) => setTasks((prev) => moveTask(prev, id, status)), [setTasks]);
  const clearDone = useCallback(() => setTasks((prev) => clearCompleted(prev)), [setTasks]);

  return { tasks, add, update, remove, move, clearDone };
}
