import { PropsWithChildren, useEffect } from 'react';
import CardHeader from './Header';
import type { CardHeaderProp } from './Header';
import CardFooter from './Footer';
import DialogPopup from '../DialogPopup';
import TodoList from '../TodoList';
import { useStore } from '@/store';
import TaskEditForm from '../TaskEditForm';
import TaskCreateForm from '../TaskCreateForm';
import { shallow } from 'zustand/shallow';

type CardProps = PropsWithChildren & CardHeaderProp;

export default function Card({ title, description }: CardProps) {
  const [
    toggleTaskUpdateDialog,
    toggleTaskCreateDialog,
    setSelectingTask,
    fetchTasks,
  ] = useStore(
    (state) => [
      state.toggleTaskUpdateDialog,
      state.toggleTaskCreateDialog,
      state.setSelectingTask,
      state.fetchTasks,
    ],
    shallow
  );
  const [
    isTaskUpdateDialogOpen,
    isTaskCreateDialogOpen,
    isShowCompletedTasks,
    uncompletedTasks,
    completedTasks,
  ] = useStore(
    (state) => [
      state.isTaskUpdateDialogOpen,
      state.isTaskCreateDialogOpen,
      state.isShowCompletedTasks,
      state.uncompletedTasks,
      state.completedTasks,
    ],
    shallow
  );

  console.log([
    isTaskUpdateDialogOpen,
    isTaskCreateDialogOpen,
    isShowCompletedTasks,
    uncompletedTasks,
    completedTasks,
  ]);

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
      <TodoList
        todos={isShowCompletedTasks ? completedTasks : uncompletedTasks}
      />
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
