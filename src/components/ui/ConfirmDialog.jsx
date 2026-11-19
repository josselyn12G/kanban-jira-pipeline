import Button from './Button';
import Modal from './Modal';

/** Diálogo de confirmación reutilizable construido sobre Modal. */
export default function ConfirmDialog({ title, message, confirmLabel = 'Confirmar', onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="confirm-message">{message}</p>
      <div className="form-actions">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} autoFocus>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
