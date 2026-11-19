import { useEffect, useState } from 'react';

const KEY = 'kanban-tasks';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [tasks]);
  return [tasks, setTasks];
}
