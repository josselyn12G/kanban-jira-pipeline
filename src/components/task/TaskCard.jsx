import { STATUSES } from '../../constants/task';
import { formatShortDate } from '../../utils/format';
import { Icon } from '../icons';
import { IconButton, ProgressBar, Select } from '../ui';
import PriorityBadge from './PriorityBadge';

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  return (
    <article
      className="card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.currentTarget.classList.add('dragging');
      }}
      onDragEnd={(e) => e.currentTarget.classList.remove('dragging')}
    >
      <PriorityBadge priority={task.priority} />
      <h3>{task.title}</h3>
      {task.description && (
        <p className="note">
          <strong>Nota:</strong> {task.description}
        </p>
      )}

      <ProgressBar value={task.progress ?? 0} label={`Progreso de ${task.title}`} showLabel />

      <footer className="card-footer">
        <span className="date">
          <Icon.Clock /> {formatShortDate(task.createdAt)}
        </span>
        <div className="card-actions">
          <Select
            className="status-select"
            label={`Estado de ${task.title}`}
            value={task.status}
            options={STATUSES}
            onChange={(status) => onMove(task.id, status)}
          />
          <IconButton icon={Icon.Edit} label="Editar" onClick={() => onEdit(task)} />
          <IconButton icon={Icon.Trash} label="Eliminar" danger onClick={() => onDelete(task.id)} />
        </div>
      </footer>
    </article>
  );
}
