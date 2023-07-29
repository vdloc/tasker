import { useDialogStore, useTagStore, useTaskStore } from '@/store';
import { Task } from '@/types';
import { lazy, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import AppTransition from '../AppTransition';
import DialogPopup from '../DialogPopup';
import TaskList from '../TaskList';
import AppFooter from './Footer';
import AppHeader from './Header';

const TagsListEditForm = lazy(() => import('../forms/TagsListEditForm'));
const TaskCreateForm = lazy(() => import('../forms/TaskCreateForm'));
const TaskEditForm = lazy(() => import('../forms/TaskEditForm'));
const UserProfileForm = lazy(() => import('../forms/UserProfileForm'));

export default function App() {
  const {
    isTagsListEditDialogOpen,
    isTaskUpdateDialogOpen,
    isTaskCreateDialogOpen,
    isUserProfileOpen,
    toggleTagsListEditDialog,
    toggleTaskUpdateDialog,
    toggleTaskCreateDialog,
    toggleUserProfileDialog,
  } = useDialogStore((state) => state, shallow);
  const { isShowCompletedTasks, setSelectingTask, completedTasks, uncompletedTasks, fetchTasks, listenOnTasksChanged } =
    useTaskStore((state) => state, shallow);
  const { fetchTags, listenOnTagsChanged } = useTagStore((state) => state, shallow);

  function handleCloseTaskEditDialog() {
    toggleTaskUpdateDialog(false);
    setSelectingTask({} as Task);
  }

  function handleCloseTaskCreateDialog() {
    toggleTaskCreateDialog(false);
    setSelectingTask({} as Task);
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
    const unsubscribeTasks = listenOnTasksChanged();
    const unsubscribeTags = listenOnTagsChanged();

    return () => {
      unsubscribeTasks();
      unsubscribeTags();
    };
  }, []);

  return (
    <AppTransition>
      <div className="w-screen md:w-[28rem] h-screen md:h-auto overflow-hidden divide-y divide-gray-200 relative z-10 px-4 rounded-2xl bg-white shadow-2xl drop-shadow-2xl">
        <AppHeader />
        <TaskList tasks={isShowCompletedTasks ? completedTasks : uncompletedTasks} loading={false} />
        <AppFooter />
        <DialogPopup isOpen={isTaskUpdateDialogOpen} onClose={handleCloseTaskEditDialog}>
          <TaskEditForm />
        </DialogPopup>
        <DialogPopup isOpen={isUserProfileOpen} onClose={handleCloseUserProfileDialog}>
          <UserProfileForm />
        </DialogPopup>
        <DialogPopup isOpen={isTaskCreateDialogOpen} onClose={handleCloseTaskCreateDialog}>
          <TaskCreateForm />
        </DialogPopup>
        <DialogPopup isOpen={isTagsListEditDialogOpen} onClose={handleCloseTagsEditDialog}>
          <TagsListEditForm />
        </DialogPopup>
      </div>
    </AppTransition>
  );
}
