import { useState } from 'react';
import { AppShell, Topbar, ProjectHeader, ViewTabs } from './components/layout';
import { Board, BoardToolbar } from './components/board';
import { TaskModal } from './components/task';
import { useTasks } from './hooks/useTasks';
import { STATUS } from './constants/task';
import { filterTasks, sortTasks, getTasksByStatus } from './utils/taskUtils';

export default function App() {
  const { tasks, add, update, remove, move, clearDone } = useTasks();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('created');
  // null = cerrado · { task: undefined } = crear · { task } = editar
  const [modal, setModal] = useState(null);

  const visibleTasks = sortTasks(filterTasks(tasks, query), sortBy);
  const doneCount = getTasksByStatus(tasks, STATUS.DONE).length;

  function handleSubmit(data) {
    if (modal.task) update(modal.task.id, data);
    else add(data);
    setModal(null);
  }

  return (
    <AppShell>
      <Topbar query={query} onQueryChange={setQuery} />
      <ProjectHeader
        title="Tablero Kanban"
        project="Gestión de tareas"
        done={doneCount}
        total={tasks.length}
      />
      <ViewTabs />
      <BoardToolbar
        query={query}
        onQueryChange={setQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onAdd={() => setModal({})}
      />
      <Board
        tasks={visibleTasks}
        onEdit={(task) => setModal({ task })}
        onDelete={remove}
        onMove={move}
        onClearDone={clearDone}
      />
      {modal && <TaskModal task={modal.task} onSubmit={handleSubmit} onClose={() => setModal(null)} />}
    </AppShell>
  );
}
