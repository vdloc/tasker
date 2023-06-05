import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, TodoItem } from './types';
import { devtools, persist } from 'zustand/middleware';
import todos from '@/data/todos.json';
import tags from "@/data/tags.json";

const createTasksSlice = (set: any) => ({
  tasks: [],
  tags: [],
  selectingTask: null,
  setSelectingTask: (task: TodoItem | null) =>
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
  createTask: (newTask: TodoItem) => {
    set((state: StoreState) => {
      state.tasks = [newTask, ...state.tasks];
    });
  },
  deleteTask: (deleteTask: TodoItem | null) =>
    set((state: StoreState) => {
      state.tasks = state.tasks.filter((task) => task.id !== deleteTask?.id);
    }),
  fetchTasks: async () => {
    await new Promise((res) => {
      setTimeout(res, 5000);
    });
    set({ tasks: todos });
  },
  fetchTags: async () => {
    await new Promise((res) => {
      setTimeout(res, 5000);
    });
    set({ tags });
  },
});

const createDialogSlice = (set: any) => ({
  isTaskUpdateDialogOpen: false,
  isTaskCreateDialogOpen: false,
  isTagsListEditDialogOpen: false,
  toggleTaskUpdateDialog: (isOpen = false) =>
    set(() => ({
      isTaskUpdateDialogOpen: isOpen,
    })),
  toggleTaskCreateDialog: (isOpen = false) =>
    set(() => ({
      isTaskCreateDialogOpen: isOpen,
    })),
  toggleTagsListEditDialog: (isOpen = false) =>
    set(() => ({
      isTagsListEditDialogOpen: isOpen,
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
