import { Modal } from '../ui';
import TaskForm from './TaskForm';

/** Modal para crear (sin `task`) o editar (con `task`) una tarea. */
export default function TaskModal({ task, onSubmit, onClose }) {
  const editing = Boolean(task);
  return (
    <Modal title={editing ? 'Editar tarea' : 'Nueva tarea'} onClose={onClose}>
      <TaskForm
        initial={task}
        submitLabel={editing ? 'Guardar' : 'Agregar'}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
