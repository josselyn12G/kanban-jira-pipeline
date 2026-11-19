import { describe, it, expect } from 'vitest';
import { buildMonthGrid, isOverdue, parseISODate, toISODate } from './date';

describe('date', () => {
  it('genera una cuadrícula de 6 semanas que empieza en lunes', () => {
    const grid = buildMonthGrid(2026, 10); // noviembre 2026
    expect(grid).toHaveLength(42);
    expect(grid[0].getDay()).toBe(1);
    expect(grid.some((d) => toISODate(d) === '2026-11-01')).toBe(true);
  });

  it('marca como vencida solo una tarea no completada con fecha pasada', () => {
    const today = new Date(2026, 10, 18);
    expect(isOverdue({ dueDate: '2026-11-17', status: 'pending' }, today)).toBe(true);
    expect(isOverdue({ dueDate: '2026-11-17', status: 'done' }, today)).toBe(false);
    expect(isOverdue({ dueDate: '2026-11-18', status: 'pending' }, today)).toBe(false);
    expect(isOverdue({ status: 'pending' }, today)).toBe(false);
  });

  it('rechaza fechas inválidas', () => {
    expect(parseISODate('2026-02-30')).toBeNull();
    expect(parseISODate('hola')).toBeNull();
    expect(toISODate(parseISODate('2026-02-28'))).toBe('2026-02-28');
  });
});
