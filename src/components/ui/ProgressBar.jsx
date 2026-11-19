function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

/**
 * Barra de progreso accesible.
 * `label` es el nombre accesible; `caption` el texto visible cuando `showLabel` es true.
 */
export default function ProgressBar({ value, label = 'Progreso', caption = 'Progreso', showLabel = false }) {
  const pct = clamp(value);
  return (
    <div className="progress">
      {showLabel && (
        <div className="progress-label">
          <span>{caption}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
