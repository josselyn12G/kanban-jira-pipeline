import { ProgressBar } from '../ui';
import { percentage } from '../../utils/format';

export default function ProjectHeader({ title, project, done, total }) {
  const pct = percentage(done, total);
  const finished = total > 0 && pct === 100;
  const statusText = total === 0 ? 'Sin tareas' : finished ? 'Completado' : 'En progreso';

  return (
    <section className="project">
      <div>
        <h1>{title}</h1>
        <p className="meta">
          Proyecto: <strong>{project}</strong>
          <span className="sep">•</span>
          Completado:{' '}
          <strong>
            {done}/{total}
          </strong>
          <span className={`status-pill${finished ? ' ok' : ''}`}>{statusText}</span>
        </p>
      </div>
      <div className="overall">
        <span>{pct}%</span>
        <ProgressBar value={pct} label="Avance del proyecto" />
      </div>
    </section>
  );
}
