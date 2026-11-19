import { describe, it, expect } from 'vitest';
import { formatShortDate, percentage } from './format';

describe('format', () => {
  it('calcula porcentajes sin dividir entre cero', () => {
    expect(percentage(1, 4)).toBe(25);
    expect(percentage(0, 0)).toBe(0);
  });

  it('devuelve cadena vacía para fechas inválidas', () => {
    expect(formatShortDate('no-es-fecha')).toBe('');
    expect(formatShortDate('2026-11-18T12:00:00Z')).not.toBe('');
  });
});
