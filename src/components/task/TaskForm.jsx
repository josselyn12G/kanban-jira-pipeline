import { useState } from 'react';
import { PRIORITIES } from '../../constants/task';
import { Button, Select } from '../ui';

export default function TaskForm({ initial, onSubmit, onCancel, submitLabel = 'Agregar' }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [priority, setPriority] = useState(initial?.priority ?? 'medium');
  const [progress, setProgress] = useState(initial?.progress ?? 0);
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    onSubmit({ title, description, priority, progress: Number(progress), dueDate });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Título</span>
        <input
          aria-label="Título"
          placeholder="Ej. Diseñar pantalla de login"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="field">
        <span>Nota</span>
        <textarea
          aria-label="Descripción"
          placeholder="Detalles o notas de la tarea (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <div className="field-row">
        <label className="field">
          <span>Prioridad</span>
          <Select label="Prioridad" value={priority} options={PRIORITIES} onChange={setPriority} />
        </label>
        <label className="field">
          <span>Progreso: {progress}%</span>
          <input
            type="range"
            aria-label="Progreso"
            min="0"
            max="100"
            step="5"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          />
        </label>
      </div>
      <label className="field">
        <span>Fecha límite</span>
        <input
          type="date"
          aria-label="Fecha límite"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
