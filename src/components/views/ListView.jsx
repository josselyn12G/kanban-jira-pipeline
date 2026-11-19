import { STATUSES } from '../../constants/task';
import { formatDueDate, isOverdue } from '../../utils/date';
import { Icon } from '../icons';
import { IconButton, ProgressBar, Select } from '../ui';
import { PriorityBadge } from '../task';

export default function ListView({ tasks, onEdit, onDelete, onMove }) {
  if (tasks.length === 0) {
    return <p className="empty view-empty">No hay tareas para mostrar.</p>;
  }

  return (
    <div className="list-wrap">
      <table className="task-table" aria-label="Lista de tareas">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Progreso</th>
            <th>Fecha límite</th>
            <th>
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>
                <strong>{t.title}</strong>
                {t.description && <span className="cell-note">{t.description}</span>}
              </td>
              <td>
                <Select
                  className="status-select"
                  label={`Estado de ${t.title}`}
                  value={t.status}
                  options={STATUSES}
                  onChange={(status) => onMove(t.id, status)}
                />
              </td>
              <td>
                <PriorityBadge priority={t.priority} />
              </td>
              <td>
                <div className="cell-progress">
                  <ProgressBar value={t.progress ?? 0} label={`Progreso de ${t.title}`} />
                  <span>{t.progress ?? 0}%</span>
                </div>
              </td>
              <td className={isOverdue(t) ? 'overdue' : ''}>{t.dueDate ? formatDueDate(t.dueDate) : '—'}</td>
              <td>
                <div className="cell-actions">
                  <IconButton icon={Icon.Edit} label="Editar" onClick={() => onEdit(t)} />
                  <IconButton icon={Icon.Trash} label="Eliminar" danger onClick={() => onDelete(t.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
