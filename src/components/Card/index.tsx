import { PropsWithChildren, useEffect } from 'react';
import CardHeader from './Header';
import type { CardHeaderProp } from './Header';
import CardFooter from './Footer';
import DialogPopup from '../DialogPopup';
import TodoList from '../TodoList';
import { useStore } from '@/store';
import TaskEditForm from '../TaskEditForm';
import TaskCreateForm from '../TaskCreateForm';

type CardProps = PropsWithChildren & CardHeaderProp;

export default function Card({ title, description }: CardProps) {
  const isTaskUpdateDialogOpen = useStore(
    (state) => state.isTaskUpdateDialogOpen
  );
  const isTaskCreateDialogOpen = useStore(
    (state) => state.isTaskCreateDialogOpen
  );
  const toggleTaskUpdateDialog = useStore(
    (state) => state.toggleTaskUpdateDialog
  );
  const toggleTaskCreateDialog = useStore(
    (state) => state.toggleTaskCreateDialog
  );
  const setSelectingTask = useStore((state) => state.setSelectingTask);
  const fetchTasks = useStore((state) => state.fetchTasks);
  const tasks = useStore((state) => state.tasks);

  function handleCloseTaskEditDialog() {
    toggleTaskUpdateDialog(false);
    setSelectingTask(null);
  }

  function handleCloseTaskCreateDialog() {
    toggleTaskCreateDialog(false);
    setSelectingTask(null);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-2xl w-[30rem] relative z-10'>
      <CardHeader title={title} description={description} />
      <TodoList todos={tasks} />
      <CardFooter />
      <DialogPopup
        isOpen={isTaskUpdateDialogOpen}
        onClose={handleCloseTaskEditDialog}
      >
        <TaskEditForm />
      </DialogPopup>
      <DialogPopup
        isOpen={isTaskCreateDialogOpen}
        onClose={handleCloseTaskCreateDialog}
      >
        <TaskCreateForm />
      </DialogPopup>
    </div>
  );
}
