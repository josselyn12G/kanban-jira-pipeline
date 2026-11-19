import { STATUS, STATUSES, PRIORITY_WEIGHT } from '../constants/task';

const VALID = STATUSES.map((s) => s.id);

let counter = 0;
const newId = () => `${Date.now().toString(36)}-${(counter++).toString(36)}`;

const clamp = (n) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));

export function createTask(tasks, { title, description = '', priority = 'medium', progress = 0 }) {
  const clean = (title ?? '').trim();
  if (!clean) throw new Error('El título es obligatorio');
  const task = {
    id: newId(),
    title: clean,
    description: description.trim(),
    priority,
    progress: clamp(progress),
    status: STATUS.PENDING,
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
          progress: clamp(changes.progress ?? t.progress),
        }
      : t
  );
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

export function moveTask(tasks, id, status) {
  if (!VALID.includes(status)) throw new Error(`Estado inválido: ${status}`);
  return tasks.map((t) => {
    if (t.id !== id) return t;
    let progress = t.progress ?? 0;
    if (status === STATUS.DONE) progress = 100;
    if (status === STATUS.PENDING) progress = 0;
    if (status === STATUS.IN_PROGRESS && progress >= 100) progress = 90;
    return { ...t, status, progress };
  });
}

export function getTasksByStatus(tasks, status) {
  return tasks.filter((t) => t.status === status);
}

export function clearCompleted(tasks) {
  return tasks.filter((t) => t.status !== STATUS.DONE);
}

export function filterTasks(tasks, query) {
  const q = (query ?? '').trim().toLowerCase();
  if (!q) return tasks;
  return tasks.filter(
    (t) => t.title.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q)
  );
}

export function sortTasks(tasks, by) {
  const list = [...tasks];
  if (by === 'priority') {
    list.sort((a, b) => (PRIORITY_WEIGHT[a.priority] ?? 1) - (PRIORITY_WEIGHT[b.priority] ?? 1));
  } else if (by === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title, 'es'));
  } else if (by === 'progress') {
    list.sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0));
  }
  return list;
}
