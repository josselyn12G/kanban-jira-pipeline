import { Icon } from '../icons';

/** Campo de búsqueda con icono. variant: 'pill' | 'box' */
export default function SearchInput({ value, onChange, label, placeholder, variant = 'box', shortcut }) {
  return (
    <label className={`search search-${variant}`}>
      <Icon.Search />
      <input
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {shortcut && <kbd>{shortcut}</kbd>}
    </label>
  );
}
