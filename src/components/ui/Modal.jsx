import { useEffect } from 'react';
import { Icon } from '../icons';
import IconButton from './IconButton';

/** Diálogo modal genérico: se cierra con Escape, clic fuera o el botón ×. */
export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-header">
          <h2>{title}</h2>
          <IconButton icon={Icon.Close} label="Cerrar" onClick={onClose} />
        </header>
        {children}
      </div>
    </div>
  );
}
