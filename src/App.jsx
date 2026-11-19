import { useState } from 'react';
import { AppShell, ProjectHeader, ViewTabs } from './components/layout';
import { Board, BoardToolbar } from './components/board';
import { TaskModal } from './components/task';
import { ConfirmDialog } from './components/ui';
import { CalendarView, ListView, SummaryView } from './components/views';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTasks } from './hooks/useTasks';
import { STATUS, VIEW, VIEW_STORAGE_KEY } from './constants/task';
import { filterTasks, sortTasks, getTasksByStatus } from './utils/taskUtils';

export default function App() {
  const { tasks, add, update, remove, move, clearDone } = useTasks();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('created');
  // null = cerrado · { task: undefined } = crear · { task } = editar
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [view, setView] = useLocalStorage(VIEW_STORAGE_KEY, VIEW.BOARD);

  const visibleTasks = sortTasks(filterTasks(tasks, query), sortBy);
  const doneCount = getTasksByStatus(tasks, STATUS.DONE).length;

  const openTask = (task) => setModal({ task });
  const askDelete = (id) => setToDelete(tasks.find((t) => t.id === id));

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
      <ViewTabs value={view} onChange={setView} />
      <BoardToolbar
        query={query}
        onQueryChange={setQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onAdd={() => setModal({})}
        showFilters={view !== VIEW.SUMMARY}
      />
      {view === VIEW.SUMMARY && <SummaryView tasks={tasks} onOpen={openTask} />}
      {view === VIEW.LIST && (
        <ListView tasks={visibleTasks} onEdit={openTask} onDelete={askDelete} onMove={move} />
      )}
      {view === VIEW.BOARD && (
        <Board
          tasks={visibleTasks}
          onEdit={openTask}
          onDelete={askDelete}
          onMove={move}
          onClearDone={clearDone}
        />
      )}
      {view === VIEW.CALENDAR && <CalendarView tasks={visibleTasks} onOpen={openTask} />}
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
