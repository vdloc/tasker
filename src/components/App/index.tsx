import { useEffect, useMemo } from 'react';
import AppHeader from './Header';
import AppFooter from './Footer';
import DialogPopup from '../DialogPopup';
import TodoList from '../TodoList';
import {
  useDialogStore,
  useTagStore,
  useTaskStore,
  useUserStore,
} from '@/store';
import TaskEditForm from '../forms/TaskEditForm';
import TaskCreateForm from '../forms/TaskCreateForm';
import TagsListEditForm from '../forms/TagsListEditForm';
import { shallow } from 'zustand/shallow';
import { Tag, Task } from '@/types';
import UserProfileForm from '../forms/UserProfileForm';
import AppTransition from '../AppTransition';
import { query, where } from 'firebase/firestore';
import { tagRef, taskRef } from '@/firebase/firestore';
import { filterTasksByStatus } from '@/utils';
import { useCollection } from '@/firebase/hooks/useCollection';

export default function App() {
  const [
    isTagsListEditDialogOpen,
    isTaskUpdateDialogOpen,
    isTaskCreateDialogOpen,
    isUserProfileOpen,
    toggleTagsListEditDialog,
    toggleTaskUpdateDialog,
    toggleTaskCreateDialog,
    toggleUserProfileDialog,
  ] = useDialogStore(
    (state) => [
      state.isTagsListEditDialogOpen,
      state.isTaskUpdateDialogOpen,
      state.isTaskCreateDialogOpen,
      state.isUserProfileOpen,
      state.toggleTagsListEditDialog,
      state.toggleTaskUpdateDialog,
      state.toggleTaskCreateDialog,
      state.toggleUserProfileDialog,
    ],
    shallow
  );
  const [isShowCompletedTasks, setSelectingTask] = useTaskStore(
    (state) => [state.isShowCompletedTasks, state.setSelectingTask],
    shallow
  );
  const user = useUserStore((state) => state.user);
  const setTags = useTagStore((state) => state.setTags);
  const tasksQuery = query(taskRef, where('userID', '==', user?.uid));
  const tagsQuery = query(tagRef, where('userID', '==', user?.uid));

  const [tasks, isTasksLoading] = useCollection(tasksQuery);
  const [tags] = useCollection(tagsQuery);
  const [completedTasks, uncompletedTasks] = filterTasksByStatus(
    (tasks as Task[]) || []
  );

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
    setTags(tags as Tag[]);
  }, [tags, setTags]);

  return (
    <AppTransition>
      <div className='w-screen md:w-[28rem] h-screen md:h-auto overflow-hidden divide-y divide-gray-200 relative z-10 px-4 rounded-2xl bg-white shadow-2xl drop-shadow-2xl'>
        <AppHeader />
        <TodoList
          todos={isShowCompletedTasks ? completedTasks : uncompletedTasks}
          loading={isTasksLoading}
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
