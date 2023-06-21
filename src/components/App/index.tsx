import { useEffect } from 'react';
import AppHeader from './Header';
import AppFooter from './Footer';
import DialogPopup from '../DialogPopup';
import TodoList from '../TodoList';
import { useStore } from '@/store';
import TaskEditForm from '../forms/TaskEditForm';
import TaskCreateForm from '../forms/TaskCreateForm';
import TagsListEditForm from '../forms/TagsListEditForm';
import { shallow } from 'zustand/shallow';
import { TodoItem } from '@/types';
import UserProfileForm from '../forms/UserProfileForm';
import AppTransition from '../AppTransition';

export default function App() {
  const [
    toggleTagsListEditDialog,
    toggleTaskUpdateDialog,
    toggleTaskCreateDialog,
    toggleUserProfileDialog,
    setSelectingTask,
    fetchTasks,
    fetchTags,
  ] = useStore(
    (state) => [
      state.toggleTagsListEditDialog,
      state.toggleTaskUpdateDialog,
      state.toggleTaskCreateDialog,
      state.toggleUserProfileDialog,
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
    isUserProfileOpen,
    uncompletedTasks,
    completedTasks,
  ] = useStore(
    (state) => [
      state.isTagsListEditDialogOpen,
      state.isTaskUpdateDialogOpen,
      state.isTaskCreateDialogOpen,
      state.isShowCompletedTasks,
      state.isUserProfileOpen,
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

  function handleCloseUserProfileDialog() {
    toggleUserProfileDialog(false);
  }

  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, []);

  return (
    <AppTransition>
      <div className='w-screen md:w-[28rem] h-screen md:h-auto overflow-hidden divide-y divide-gray-200 relative z-10 px-4 rounded-2xl bg-white shadow-2xl drop-shadow-2xl'>
        <AppHeader />
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
          isOpen={isUserProfileOpen}
          onClose={handleCloseUserProfileDialog}
        >
          <UserProfileForm />
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
    </AppTransition>
  );
}
