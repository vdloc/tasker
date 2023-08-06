import { StorePersistKey, StoreState } from '@/types';
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

import { dialogReducer, tagReducer, taskReducer, userReducer } from './reducer';

function createUseStore<T>(reducer: (set: any, get: any) => T, persistName: StorePersistKey) {
  const initializer: StateCreator<T, [['zustand/persist', unknown], ['zustand/immer', never]]> = (set, get) =>
    reducer(set, get);
  const store = devtools(persist(immer(initializer), { name: persistName }));
  return create<T>()(store);
}

function combineReducers(set: any, get: any) {
  return {
    ...tagReducer(set, get),
    ...taskReducer(set, get),
    ...dialogReducer(set, get),
    ...userReducer(set),
  };
}

const useStore: any = createUseStore<StoreState>(combineReducers, StorePersistKey.App);

export const useTagStore = () => {
  const { tags, addTag, addTags, deleteTag, fetchTags, listenOnTagsChanged } = useStore((state: any) => state, shallow);
  return { tags, addTag, addTags, deleteTag, fetchTags, listenOnTagsChanged };
};
export const useTaskStore = () => {
  const {
    completedTasks,
    uncompletedTasks,
    selectingTask,
    isShowCompletedTasks,
    createTask,
    updateTask,
    createTasks,
    deleteTask,
    fetchTasks,
    resetTasks,
    setSelectingTask,
    toggleShowCompletedTasks,
    listenOnTasksChanged,
  } = useStore((state: any) => state, shallow);
  return {
    completedTasks,
    uncompletedTasks,
    selectingTask,
    isShowCompletedTasks,
    createTask,
    updateTask,
    createTasks,
    deleteTask,
    fetchTasks,
    resetTasks,
    setSelectingTask,
    toggleShowCompletedTasks,
    listenOnTasksChanged,
  };
};
export const useDialogStore = () => {
  const {
    isTagsListEditDialogOpen,
    isTaskCreateDialogOpen,
    isTaskUpdateDialogOpen,
    isUserProfileOpen,
    toggleTagsListEditDialog,
    toggleTaskCreateDialog,
    toggleTaskUpdateDialog,
    toggleUserProfileDialog,
    resetDialogs,
  } = useStore((state: any) => state, shallow);
  return {
    isTagsListEditDialogOpen,
    isTaskCreateDialogOpen,
    isTaskUpdateDialogOpen,
    isUserProfileOpen,
    toggleTagsListEditDialog,
    toggleTaskCreateDialog,
    toggleTaskUpdateDialog,
    toggleUserProfileDialog,
    resetDialogs,
  };
};
export const useUserStore = () => {
  const { user, setUser } = useStore((state: any) => state, shallow);
  return { user, setUser };
};
