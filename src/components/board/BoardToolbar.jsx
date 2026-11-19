import { useCallback, useRef } from 'react';
import { SORT_OPTIONS } from '../../constants/task';
import { useShortcut } from '../../hooks/useShortcut';
import { Icon } from '../icons';
import { Button, SearchInput, Select } from '../ui';

export default function BoardToolbar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
  onAdd,
  showFilters = true,
}) {
  const searchRef = useRef(null);
  useShortcut(
    'k',
    useCallback(() => searchRef.current?.focus(), [])
  );

  return (
    <div className="toolbar">
      {showFilters ? (
        <div className="toolbar-left">
          <SearchInput
            variant="pill"
            label="Buscar tarea"
            placeholder="Buscar una tarea..."
            value={query}
            onChange={onQueryChange}
            shortcut="⌘K"
            inputRef={searchRef}
          />
          <label className="sort">
            <span>Ordenar por:</span>
            <Select label="Ordenar por" value={sortBy} options={SORT_OPTIONS} onChange={onSortChange} />
          </label>
        </div>
      ) : (
        <span />
      )}
      <Button variant="accent" icon={Icon.Plus} onClick={onAdd}>
        Nueva tarea
      </Button>
    </div>
  );
}
