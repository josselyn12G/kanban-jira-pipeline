import { VIEW, VIEWS } from '../../constants/task';
import { Icon } from '../icons';

const ICONS = {
  [VIEW.SUMMARY]: Icon.Grid,
  [VIEW.LIST]: Icon.List,
  [VIEW.BOARD]: Icon.Board,
  [VIEW.CALENDAR]: Icon.Calendar,
};

export default function ViewTabs({ value, onChange }) {
  return (
    <nav className="tabs" role="tablist" aria-label="Vistas">
      {VIEWS.map(({ id, label }) => {
        const TabIcon = ICONS[id];
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`tab${active ? ' active' : ''}`}
            onClick={() => onChange(id)}
          >
            <TabIcon /> {label}
          </button>
        );
      })}
    </nav>
  );
}
