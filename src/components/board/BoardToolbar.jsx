import { SORT_OPTIONS } from '../../constants/task';
import { Icon } from '../icons';
import { Button, SearchInput, Select } from '../ui';

export default function BoardToolbar({ query, onQueryChange, sortBy, onSortChange, onAdd }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <SearchInput
          label="Filtrar tareas"
          placeholder="Filtrar tarea"
          value={query}
          onChange={onQueryChange}
        />
        <label className="sort">
          <span>Ordenar por:</span>
          <Select label="Ordenar por" value={sortBy} options={SORT_OPTIONS} onChange={onSortChange} />
        </label>
      </div>
      <Button variant="accent" icon={Icon.Plus} onClick={onAdd}>
        Nueva tarea
      </Button>
    </div>
  );
}
