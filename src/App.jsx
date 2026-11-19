import { useState } from 'react';
import { AppShell, ProjectHeader, ViewTabs } from './components/layout';
import { Board, BoardToolbar } from './components/board';
import { TaskModal } from './components/task';
import { ConfirmDialog } from './components/ui';
import { useTasks } from './hooks/useTasks';
import { STATUS } from './constants/task';
import { filterTasks, sortTasks, getTasksByStatus } from './utils/taskUtils';

export default function App() {
  const { tasks, add, update, remove, move, clearDone } = useTasks();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('created');
  // null = cerrado · { task: undefined } = crear · { task } = editar
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const visibleTasks = sortTasks(filterTasks(tasks, query), sortBy);
  const doneCount = getTasksByStatus(tasks, STATUS.DONE).length;

  function handleSubmit(data) {
    if (modal.task) update(modal.task.id, data);
    else add(data);
    setModal(null);
  }

  return (
    <AppShell>
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
        onDelete={(id) => setToDelete(tasks.find((t) => t.id === id))}
        onMove={move}
        onClearDone={clearDone}
      />
      {modal && <TaskModal task={modal.task} onSubmit={handleSubmit} onClose={() => setModal(null)} />}
      {toDelete && (
        <ConfirmDialog
          title="Eliminar tarea"
          message={`¿Seguro que deseas eliminar «${toDelete.title}»? Esta acción no se puede deshacer.`}
          confirmLabel="Sí, eliminar"
          onConfirm={() => {
            remove(toDelete.id);
            setToDelete(null);
          }}
          onCancel={() => setToDelete(null)}
        />
      )}
    </AppShell>
  );
}
