/**
 * Botón base. variant: 'primary' | 'accent' | 'ghost'
 */
export default function Button({
  variant = 'primary',
  icon: IconComponent,
  children,
  className = '',
  ...props
}) {
  return (
    <button type="button" className={`btn btn-${variant} ${className}`.trim()} {...props}>
      {IconComponent && <IconComponent />}
      {children}
    </button>
  );
}
