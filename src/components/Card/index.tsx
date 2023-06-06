import { PropsWithChildren, useEffect } from 'react';
import CardHeader from './Header';
import type { CardHeaderProp } from './Header';
import CardFooter from './Footer';
import DialogPopup from '../DialogPopup';
import TodoList from '../TodoList';
import { useStore } from '@/store';
import TaskEditForm from '../TaskEditForm';
import TaskCreateForm from '../TaskCreateForm';
import TagsListEditForm from "../TagsListEditForm";
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
  const toggleTaskUpdateDialog = useStore(
    (state) => state.toggleTaskUpdateDialog
  );
  const toggleTaskCreateDialog = useStore(
    (state) => state.toggleTaskCreateDialog
  );
  const isTagsListEditDialogOpen = useStore(
    (state) => state.isTagsListEditDialogOpen
  );
  const toggleTagsListEditDialog = useStore(
    (state) => state.toggleTagsListEditDialog
  );
  const setSelectingTask = useStore((state) => state.setSelectingTask);
  const fetchTasks = useStore((state) => state.fetchTasks);
  const fetchTags = useStore((state) => state.fetchTags);
  const tasks = useStore((state) => state.tasks);

  function handleCloseTaskEditDialog() {
    toggleTaskUpdateDialog(false);
    setSelectingTask(null);
  }

  function handleCloseTaskCreateDialog() {
    toggleTaskCreateDialog(false);
    setSelectingTask(null);
  }

  function handleCloseTagsEditDialog() {
    toggleTagsListEditDialog(false);
  }

  useEffect(() => {
    fetchTasks();
    fetchTags();
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
      <DialogPopup
        isOpen={isTagsListEditDialogOpen}
        onClose={handleCloseTagsEditDialog}
      >
        <TagsListEditForm />
      </DialogPopup>
    </div>
  );
}
