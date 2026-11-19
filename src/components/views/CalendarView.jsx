import { useState } from 'react';
import { buildMonthGrid, formatMonthLabel, isOverdue, toISODate } from '../../utils/date';
import { Icon } from '../icons';
import { IconButton, Button } from '../ui';

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function CalendarView({ tasks, onOpen }) {
  const now = new Date();
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const todayISO = toISODate(now);

  const byDay = new Map();
  for (const t of tasks) {
    if (!t.dueDate) continue;
    byDay.set(t.dueDate, [...(byDay.get(t.dueDate) ?? []), t]);
  }
  const withoutDate = tasks.filter((t) => !t.dueDate).length;
  const days = buildMonthGrid(cursor.year, cursor.month);

  const shift = (delta) =>
    setCursor(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  return (
    <section className="calendar" aria-label="Calendario">
      <header className="calendar-header">
        <div className="calendar-nav">
          <IconButton icon={Icon.ChevronLeft} label="Mes anterior" onClick={() => shift(-1)} />
          <h2>{formatMonthLabel(cursor.year, cursor.month)}</h2>
          <IconButton icon={Icon.ChevronRight} label="Mes siguiente" onClick={() => shift(1)} />
        </div>
        <Button variant="ghost" onClick={() => setCursor({ year: now.getFullYear(), month: now.getMonth() })}>
          Hoy
        </Button>
      </header>

      <div className="calendar-grid" role="grid">
        {WEEKDAYS.map((d) => (
          <div key={d} className="weekday" role="columnheader">
            {d}
          </div>
        ))}
        {days.map((date) => {
          const iso = toISODate(date);
          const items = byDay.get(iso) ?? [];
          const outside = date.getMonth() !== cursor.month;
          return (
            <div
              key={iso}
              role="gridcell"
              aria-label={iso}
              className={`day${outside ? ' outside' : ''}${iso === todayISO ? ' today' : ''}`}
            >
              <span className="day-number">{date.getDate()}</span>
              {items.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`chip chip-${t.status}${isOverdue(t) ? ' overdue' : ''}`}
                  title={t.title}
                  onClick={() => onOpen(t)}
                >
                  {t.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {withoutDate > 0 && (
        <p className="calendar-foot">
          {withoutDate} {withoutDate === 1 ? 'tarea no tiene' : 'tareas no tienen'} fecha límite y no aparece
          {withoutDate === 1 ? '' : 'n'} en el calendario.
        </p>
      )}
    </section>
  );
}
