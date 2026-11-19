import { Icon } from '../icons';

/** Campo de búsqueda con icono. variant: 'pill' | 'box'. `inputRef` permite enfocarlo desde fuera. */

export default function SearchInput({
  value,
  onChange,
  label,
  placeholder,
  variant = 'box',
  shortcut,
  inputRef,
}) {
  return (
    <label className={`search search-${variant}`}>
      <Icon.Search />
      <input
        ref={inputRef}
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {shortcut && <kbd>{shortcut}</kbd>}
    </label>
  );
}
