import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, TodoItem } from './types';
import { devtools, persist } from 'zustand/middleware';
import todos from '@/data/todos.json';

const createTasksSlice = (set: any) => ({
  tasks: [],
  selectingTask: null,
  setSelectingTask: (task: null | TodoItem) =>
    set(() => ({ selectingTask: task })),
  updateTask: (updatedTask: TodoItem) =>
    set((state: StoreState) => {
      const updatingTaskIndex = state.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      state.tasks = [
        ...state.tasks.slice(0, updatingTaskIndex),
        updatedTask,
        ...state.tasks.slice(updatingTaskIndex + 1),
      ];
    }),
  fetchTasks: async () => {
    await new Promise((res) => {
      setTimeout(res, 5000);
    });
    set({ tasks: todos });
  },
});

const createDialogSlice = (set: any) => ({
  isTaskUpdateDialogOpen: false,
  isTaskCreateCreateOpen: false,
  toggleTaskUpdateDialog: (isOpen = false) =>
    set(() => ({
      isTaskUpdateDialogOpen: isOpen,
      isTaskCreateCreateOpen: false,
    })),
  toggleTaskCreateDialog: (isOpen = false) =>
    set(() => ({
      isTaskCreateCreateOpen: isOpen,
      isTaskUpdateDialogOpen: false,
    })),
});

const initializer: StateCreator<
  StoreState,
  [['zustand/persist', unknown], ['zustand/immer', never]]
> = (set) => ({
  ...createTasksSlice(set),
  ...createDialogSlice(set),
});

const createStore = devtools(persist(immer(initializer), { name: 'todo' }));

export const useStore = create<StoreState>()(createStore);
