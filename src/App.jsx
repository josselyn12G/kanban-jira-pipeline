import Column from './Column';
import TaskForm from './TaskForm';
import { useTasks } from './useTasks';
import {
  STATUSES,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
  getTasksByStatus,
  clearCompleted,
} from './taskUtils';

export default function App() {
  const [tasks, setTasks] = useTasks();

  return (
    <main className="app">
      <header className="app-header">
        <h1>Tablero Kanban</h1>
        <p>Gestiona tus tareas como en Jira</p>
      </header>
      <TaskForm onSubmit={(data) => setTasks((prev) => createTask(prev, data))} />
      <div className="board">
        {STATUSES.map((s) => (
          <Column
            key={s.id}
            status={s}
            tasks={getTasksByStatus(tasks, s.id)}
            onEdit={(id, data) => setTasks((prev) => updateTask(prev, id, data))}
            onDelete={(id) => setTasks((prev) => deleteTask(prev, id))}
            onMove={(id, st) => setTasks((prev) => moveTask(prev, id, st))}
            onClear={s.id === 'done' ? () => setTasks((prev) => clearCompleted(prev)) : undefined}
          />
        ))}
      </div>
    </main>
  );
}
