import { Icon } from '../icons';

const MAIN_NAV = [
  { icon: Icon.Home, label: 'Inicio' },
  { icon: Icon.Board, label: 'Tablero', active: true },
  { icon: Icon.Check, label: 'Tareas' },
  { icon: Icon.Users, label: 'Equipo' },
  { icon: Icon.Calendar, label: 'Calendario' },
];

const FOOTER_NAV = [
  { icon: Icon.Settings, label: 'Configuración' },
  { icon: Icon.Help, label: 'Ayuda' },
  { icon: Icon.Logout, label: 'Salir' },
];

function NavGroup({ items, className = '' }) {
  return (
    <nav className={`nav-group ${className}`.trim()}>
      {items.map(({ icon: ItemIcon, label, active }) => (
        <span key={label} className={`nav-item${active ? ' active' : ''}`} title={label}>
          <ItemIcon />
        </span>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Navegación">
      <div className="logo">
        <Icon.Logo />
      </div>
      <NavGroup items={MAIN_NAV} />
      <NavGroup items={FOOTER_NAV} className="nav-bottom" />
    </aside>
  );
}
