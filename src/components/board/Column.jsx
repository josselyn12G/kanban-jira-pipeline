import { useState } from 'react';
import { TaskCard } from '../task';

export default function Column({ status, tasks, onEdit, onDelete, onMove, onClear }) {
  const [isOver, setIsOver] = useState(false);

  return (
    <section
      className={`column column-${status.id}${isOver ? ' over' : ''}`}
      aria-label={status.label}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        setIsOver(false);
        const id = e.dataTransfer.getData('text/plain');
        if (id) onMove(id, status.id);
      }}
    >
      <header className="column-header">
        <h2>
          <span className="dot" />
          {status.label}
        </h2>
        <span className="count">{tasks.length}</span>
      </header>

      {onClear && tasks.length > 0 && (
        <button type="button" className="clear-btn" onClick={onClear}>
          Limpiar completadas
        </button>
      )}

      <div className="column-body">
        {tasks.length === 0 && <p className="empty">Arrastra tareas aquí</p>}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
        ))}
      </div>
    </section>
  );
}
