import TaskCard from './TaskCard';

export default function Column({ status, tasks, onEdit, onDelete, onMove, onClear }) {
  return (
    <section
      className="column"
      aria-label={status.label}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData('text/plain');
        if (id) onMove(id, status.id);
      }}
    >
      <header>
        <h2>{status.label}</h2>
        <span className="count">{tasks.length}</span>
      </header>
      {onClear && tasks.length > 0 && (
        <button className="secondary clear-btn" onClick={onClear}>
          Limpiar completadas
        </button>
      )}
      {tasks.length === 0 && <p className="empty">Sin tareas</p>}
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
      ))}
    </section>
  );
}
