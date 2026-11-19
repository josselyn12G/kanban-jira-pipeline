/** Botón cuadrado solo con icono. El `label` es obligatorio por accesibilidad. */
export default function IconButton({ icon: IconComponent, label, danger = false, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`icon-btn${danger ? ' danger' : ''} ${className}`.trim()}
      aria-label={label}
      title={label}
      {...props}
    >
      <IconComponent />
    </button>
  );
}
