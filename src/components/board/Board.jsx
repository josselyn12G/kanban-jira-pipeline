import { STATUS, STATUSES } from '../../constants/task';
import { getTasksByStatus } from '../../utils/taskUtils';
import Column from './Column';

export default function Board({ tasks, onEdit, onDelete, onMove, onClearDone }) {
  return (
    <div className="board">
      {STATUSES.map((status) => (
        <Column
          key={status.id}
          status={status}
          tasks={getTasksByStatus(tasks, status.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          onClear={status.id === STATUS.DONE ? onClearDone : undefined}
        />
      ))}
    </div>
  );
}
