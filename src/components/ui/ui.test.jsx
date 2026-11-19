import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge, ProgressBar, Modal } from './index';

describe('componentes UI', () => {
  it('Badge aplica la clase del tono', () => {
    render(<Badge tone="high">Alta</Badge>);
    expect(screen.getByText('Alta')).toHaveClass('badge', 'badge-high');
  });

  it('ProgressBar limita el valor entre 0 y 100', () => {
    render(<ProgressBar value={150} label="Avance" />);
    expect(screen.getByRole('progressbar', { name: 'Avance' })).toHaveAttribute('aria-valuenow', '100');
  });

  it('Modal se cierra con la tecla Escape', async () => {
    const onClose = vi.fn();
    render(
      <Modal title="Prueba" onClose={onClose}>
        contenido
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
