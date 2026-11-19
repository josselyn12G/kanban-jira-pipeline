import { useState } from 'react';

export default function TaskForm({ initial, onSubmit, onCancel, submitLabel = 'Agregar' }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    onSubmit({ title, description });
    if (!initial) {
      setTitle('');
      setDescription('');
    }
    setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        aria-label="Título"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        aria-label="Descripción"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <p className="error" role="alert">{error}</p>}
      <div className="form-actions">
        <button type="submit">{submitLabel}</button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
