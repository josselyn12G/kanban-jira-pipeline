import { STATUS, STATUSES, PRIORITY_WEIGHT } from '../constants/task';

const VALID = STATUSES.map((s) => s.id);

let counter = 0;
const newId = () => `${Date.now().toString(36)}-${(counter++).toString(36)}`;

const clamp = (n) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));

export function createTask(
  tasks,
  { title, description = '', priority = 'medium', progress = 0, dueDate = '' }
) {
  const clean = (title ?? '').trim();
  if (!clean) throw new Error('El título es obligatorio');
  const task = {
    id: newId(),
    title: clean,
    description: description.trim(),
    priority,
    progress: clamp(progress),
    dueDate,
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
  } else if (by === 'due') {
    // Sin fecha límite al final
    list.sort((a, b) => (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31'));
  } else if (by === 'progress') {
    list.sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0));
  }
  return list;
}

/** Métricas para la vista Resumen. */
export function getSummary(tasks, today = new Date()) {
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const byStatus = Object.fromEntries(STATUSES.map((s) => [s.id, 0]));
  const byPriority = { high: 0, medium: 0, low: 0 };
  let overdue = 0;
  let progressSum = 0;
  for (const t of tasks) {
    byStatus[t.status] = (byStatus[t.status] ?? 0) + 1;
    byPriority[t.priority ?? 'medium'] += 1;
    progressSum += t.progress ?? 0;
    if (t.dueDate && t.status !== STATUS.DONE && t.dueDate < todayISO) overdue += 1;
  }
  const upcoming = tasks
    .filter((t) => t.dueDate && t.status !== STATUS.DONE && t.dueDate >= todayISO)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);
  return {
    total: tasks.length,
    byStatus,
    byPriority,
    overdue,
    averageProgress: tasks.length ? Math.round(progressSum / tasks.length) : 0,
    upcoming,
  };
}
