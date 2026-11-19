import { useCallback, useRef } from 'react';
import { Icon } from '../icons';
import { useShortcut } from '../../hooks/useShortcut';
import { SearchInput } from '../ui';

export default function Topbar({ query, onQueryChange, userName = 'Ingeniería Web', userInitials = 'IW' }) {
  const searchRef = useRef(null);
  useShortcut(
    'k',
    useCallback(() => searchRef.current?.focus(), [])
  );

  return (
    <div className="topbar">
      <SearchInput
        variant="pill"
        label="Buscar tarea"
        placeholder="Buscar una tarea..."
        value={query}
        onChange={onQueryChange}
        shortcut="⌘K"
        inputRef={searchRef}
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
