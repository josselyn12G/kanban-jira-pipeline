export const STATUSES = [
  { id: 'pending', label: 'Pendiente' },
  { id: 'in-progress', label: 'En progreso' },
  { id: 'done', label: 'Completado' },
];

const VALID = STATUSES.map((s) => s.id);

let counter = 0;
const newId = () => `${Date.now().toString(36)}-${(counter++).toString(36)}`;

export function createTask(tasks, { title, description = '' }) {
  const clean = (title ?? '').trim();
  if (!clean) throw new Error('El título es obligatorio');
  const task = {
    id: newId(),
    title: clean,
    description: description.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  return [...tasks, task];
}

export function updateTask(tasks, id, changes) {
  if (changes.title !== undefined && !changes.title.trim()) {
    throw new Error('El título es obligatorio');
  }
  return tasks.map((t) =>
    t.id === id
      ? {
          ...t,
          ...changes,
          title: (changes.title ?? t.title).trim(),
          description: (changes.description ?? t.description).trim(),
        }
      : t
  );
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

export function moveTask(tasks, id, status) {
  if (!VALID.includes(status)) throw new Error(`Estado inválido: ${status}`);
  return tasks.map((t) => (t.id === id ? { ...t, status } : t));
}

export function getTasksByStatus(tasks, status) {
  return tasks.filter((t) => t.status === status);
}

export function clearCompleted(tasks) {
  return tasks.filter((t) => t.status !== 'done');
}
