import { PRIORITIES, STATUSES } from '../../constants/task';
import { getSummary } from '../../utils/taskUtils';
import { formatDueDate } from '../../utils/date';
import { percentage } from '../../utils/format';
import { Icon } from '../icons';
import { ProgressBar } from '../ui';
import { PriorityBadge } from '../task';

function StatCard({ label, value, tone = 'default', hint }) {
  return (
    <div className={`stat stat-${tone}`}>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}

export default function SummaryView({ tasks, onOpen }) {
  const s = getSummary(tasks);

  return (
    <section className="summary" aria-label="Resumen">
      <div className="stats">
        <StatCard label="Total de tareas" value={s.total} />
        <StatCard label="Pendientes" value={s.byStatus.pending} tone="pending" />
        <StatCard label="En progreso" value={s.byStatus['in-progress']} tone="in-progress" />
        <StatCard label="Completadas" value={s.byStatus.done} tone="done" />
        <StatCard
          label="Vencidas"
          value={s.overdue}
          tone={s.overdue ? 'danger' : 'default'}
          hint="Con fecha límite pasada"
        />
      </div>

      <div className="panels">
        <div className="panel">
          <h2>Avance por estado</h2>
          {STATUSES.map((st) => (
            <div key={st.id} className="panel-row">
              <span className={`dot-label dot-${st.id}`}>{st.label}</span>
              <ProgressBar value={percentage(s.byStatus[st.id], s.total)} label={`Porcentaje ${st.label}`} />
              <span className="panel-value">{s.byStatus[st.id]}</span>
            </div>
          ))}
          <p className="panel-foot">
            Progreso promedio: <strong>{s.averageProgress}%</strong>
          </p>
        </div>

        <div className="panel">
          <h2>Por prioridad</h2>
          {[...PRIORITIES].reverse().map((p) => (
            <div key={p.id} className="panel-row">
              <PriorityBadge priority={p.id} />
              <ProgressBar
                value={percentage(s.byPriority[p.id], s.total)}
                label={`Porcentaje prioridad ${p.label}`}
              />
              <span className="panel-value">{s.byPriority[p.id]}</span>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>Próximos vencimientos</h2>
          {s.upcoming.length === 0 ? (
            <p className="empty">No hay tareas pendientes con fecha límite.</p>
          ) : (
            <ul className="upcoming">
              {s.upcoming.map((t) => (
                <li key={t.id}>
                  <button type="button" onClick={() => onOpen(t)}>
                    <span>{t.title}</span>
                    <span className="date">
                      <Icon.Clock /> {formatDueDate(t.dueDate)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
