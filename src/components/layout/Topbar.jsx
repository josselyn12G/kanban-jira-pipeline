import { Icon } from '../icons';
import { SearchInput } from '../ui';

export default function Topbar({ query, onQueryChange, userName = 'Ingeniería Web', userInitials = 'IW' }) {
  return (
    <div className="topbar">
      <SearchInput
        variant="pill"
        label="Buscar tarea"
        placeholder="Buscar una tarea..."
        value={query}
        onChange={onQueryChange}
        shortcut="⌘K"
      />
      <div className="topbar-right">
        <span className="pill icon-pill" title="Notificaciones">
          <Icon.Bell />
        </span>
        <span className="pill user">
          <span className="avatar">{userInitials}</span>
          {userName}
        </span>
      </div>
    </div>
  );
}
