import { useState } from 'react';
import { STATUSES } from './taskUtils';
import TaskForm from './TaskForm';

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <article className="card">
        <TaskForm
          initial={task}
          submitLabel="Guardar"
          onCancel={() => setEditing(false)}
          onSubmit={(data) => {
            onEdit(task.id, data);
            setEditing(false);
          }}
        />
      </article>
    );
  }

  return (
    <article
      className={`card status-${task.status}`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
    >
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="card-actions">
        <select
          aria-label={`Estado de ${task.title}`}
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <button className="secondary" onClick={() => setEditing(true)}>Editar</button>
        <button className="danger" onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </article>
  );
}
