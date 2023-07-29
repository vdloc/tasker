import { useEffect } from 'react';
import AppHeader from './Header';
import AppFooter from './Footer';
import DialogPopup from '../DialogPopup';
import TaskList from '../TaskList';
import { useDialogStore, useTagStore, useTaskStore, useUserStore } from '@/store';
import TaskEditForm from '../forms/TaskEditForm';
import TaskCreateForm from '../forms/TaskCreateForm';
import TagsListEditForm from '../forms/TagsListEditForm';
import { shallow } from 'zustand/shallow';
import { Tag, Task } from '@/types';
import UserProfileForm from '../forms/UserProfileForm';
import AppTransition from '../AppTransition';


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
  const user = useUserStore((state) => state.user);
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
  console.log('render');

  useEffect(() => {
    fetchTasks();
    fetchTags();
    listenOnTasksChanged();
    const unsubscribeTags = listenOnTagsChanged();

    return () => {
      unsubscribeTags();
    };
  }, []);

  // useEffect(() => {
  //   setTags(tags as Tag[]);
  // }, [tags, setTags]);

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
