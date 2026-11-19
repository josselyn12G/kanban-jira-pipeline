import { PRIORITIES } from '../../constants/task';
import { Badge } from '../ui';

export default function PriorityBadge({ priority = 'medium' }) {
  const label = PRIORITIES.find((p) => p.id === priority)?.label ?? 'Media';
  return <Badge tone={priority}>{label}</Badge>;
}
