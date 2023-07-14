import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';
import { dialogReducer, tagReducer, taskReducer, userReducer } from './reducer';
import { DialogState, StorePersistKey, TagState, TaskState, UserState } from '@/types';

function createUseStore<T>(reducer: (set: (state: T) => void, get: () => T) => T, persistName: StorePersistKey) {
  const initializer: StateCreator<T, [['zustand/persist', unknown], ['zustand/immer', never]]> = (set, get) =>
    reducer(set, get);
  const store = devtools(persist(immer(initializer), { name: persistName }));
  return create<T>()(store);
}

export const useTagStore = createUseStore<TagState>(tagReducer, StorePersistKey.Tag);
export const useTaskStore = createUseStore<TaskState>(taskReducer, StorePersistKey.Task);
export const useDialogStore = createUseStore<DialogState>(dialogReducer, StorePersistKey.Dialog);
export const useUserStore = createUseStore<UserState>(userReducer, StorePersistKey.User);
