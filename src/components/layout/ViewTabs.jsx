import { Icon } from '../icons';

const TABS = [
  { icon: Icon.Grid, label: 'Resumen' },
  { icon: Icon.List, label: 'Lista' },
  { icon: Icon.Board, label: 'Tablero', active: true },
  { icon: Icon.Calendar, label: 'Calendario' },
];

export default function ViewTabs() {
  return (
    <nav className="tabs" aria-label="Vistas">
      {TABS.map(({ icon: TabIcon, label, active }) => (
        <span key={label} className={`tab${active ? ' active' : ''}`}>
          <TabIcon /> {label}
        </span>
      ))}
    </nav>
  );
}
