import { PropsWithChildren, useEffect } from 'react';
import AppHeader from './Header';
import type { AppHeaderProp } from './Header';
import AppFooter from './Footer';
import DialogPopup from '../DialogPopup';
import TodoList from '../TodoList';
import { useStore } from '@/store';
import TaskEditForm from '../forms/TaskEditForm';
import TaskCreateForm from '../forms/TaskCreateForm';
import TagsListEditForm from '../forms/TagsListEditForm';
import { shallow } from 'zustand/shallow';
import { TodoItem } from '@/types';

type CardProps = PropsWithChildren & AppHeaderProp;

export default function AppCard({ title, description }: CardProps) {
  const [
    toggleTagsListEditDialog,
    toggleTaskUpdateDialog,
    toggleTaskCreateDialog,
    setSelectingTask,
    fetchTasks,
    fetchTags,
  ] = useStore(
    (state) => [
      state.toggleTagsListEditDialog,
      state.toggleTaskUpdateDialog,
      state.toggleTaskCreateDialog,
      state.setSelectingTask,
      state.fetchTasks,
      state.fetchTags,
    ],
    shallow
  );
  const [
    isTagsListEditDialogOpen,
    isTaskUpdateDialogOpen,
    isTaskCreateDialogOpen,
    isShowCompletedTasks,
    uncompletedTasks,
    completedTasks,
  ] = useStore(
    (state) => [
      state.isTagsListEditDialogOpen,
      state.isTaskUpdateDialogOpen,
      state.isTaskCreateDialogOpen,
      state.isShowCompletedTasks,
      state.uncompletedTasks,
      state.completedTasks,
    ],
    shallow
  );

  function handleCloseTaskEditDialog() {
    toggleTaskUpdateDialog(false);
    setSelectingTask({} as TodoItem);
  }

  function handleCloseTaskCreateDialog() {
    toggleTaskCreateDialog(false);
    setSelectingTask({} as TodoItem);
  }

  function handleCloseTagsEditDialog() {
    toggleTagsListEditDialog(false);
  }

  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, []);

  return (
    <div className='divide-y divide-gray-200 py-4'>
      <AppHeader title={title} description={description} />
      <TodoList
        todos={isShowCompletedTasks ? completedTasks : uncompletedTasks}
      />
      <AppFooter />
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
