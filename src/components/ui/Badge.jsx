/** Etiqueta pequeña de color. tone: 'low' | 'medium' | 'high' | 'info' | 'success' */
export default function Badge({ tone = 'medium', children }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
