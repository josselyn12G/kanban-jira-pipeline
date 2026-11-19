import { Icon } from '../icons';

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Navegación">
      <div className="logo" title="Kanban">
        <Icon.Logo />
      </div>
      <nav className="nav-group">
        <span className="nav-item active" title="Tablero" aria-current="page">
          <Icon.Board />
        </span>
      </nav>
      <span className="version" title="Versión de la aplicación">
        v{__APP_VERSION__}
      </span>
    </aside>
  );
}
