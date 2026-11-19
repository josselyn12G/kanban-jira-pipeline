export const STATUS = Object.freeze({
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
});

export const STATUSES = [
  { id: STATUS.PENDING, label: 'Pendiente' },
  { id: STATUS.IN_PROGRESS, label: 'En progreso' },
  { id: STATUS.DONE, label: 'Completado' },
];

export const PRIORITIES = [
  { id: 'low', label: 'Baja' },
  { id: 'medium', label: 'Media' },
  { id: 'high', label: 'Alta' },
];

export const PRIORITY_WEIGHT = { high: 0, medium: 1, low: 2 };

export const SORT_OPTIONS = [
  { id: 'created', label: 'Fecha' },
  { id: 'priority', label: 'Prioridad' },
  { id: 'progress', label: 'Progreso' },
  { id: 'title', label: 'Título' },
  { id: 'due', label: 'Fecha límite' },
];

export const STORAGE_KEY = 'kanban-tasks';

export const VIEW = Object.freeze({
  SUMMARY: 'summary',
  LIST: 'list',
  BOARD: 'board',
  CALENDAR: 'calendar',
});

export const VIEWS = [
  { id: VIEW.SUMMARY, label: 'Resumen' },
  { id: VIEW.LIST, label: 'Lista' },
  { id: VIEW.BOARD, label: 'Tablero' },
  { id: VIEW.CALENDAR, label: 'Calendario' },
];

export const VIEW_STORAGE_KEY = 'kanban-view';
