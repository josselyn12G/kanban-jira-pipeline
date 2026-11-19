/** Select controlado a partir de una lista de opciones { id, label }. */
export default function Select({ value, onChange, options, label, className = '', ...props }) {
  return (
    <select
      className={className}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
