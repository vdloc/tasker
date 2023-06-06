import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, TodoItem } from './types';
import { devtools, persist } from 'zustand/middleware';
import todos from '@/data/todos.json';
import tags from "@/data/tags.json";

const createTasksSlice = (set: any) => ({
  uncompletedTasks: [],
  completedTasks: [],
  tags: [],
  selectingTask: null,
  isShowCompletedTasks: false,
  toggleShowCompletedTasks: (isShow: boolean) =>
    set({ isShowCompletedTasks: isShow }),
  setSelectingTask: (task: TodoItem | null) =>
    set(() => ({ selectingTask: task })),
  updateTask: (updatedTask: TodoItem) =>
    set((state: StoreState) => {
      if (
        updatedTask.status &&
        !state.completedTasks.find((task) => task.id === updatedTask.id)
      ) {
        state.completedTasks = [updatedTask, ...state.completedTasks];
        state.uncompletedTasks = state.uncompletedTasks.filter(
          (task) => task.id !== updatedTask.id
        );
      } else {
        state.uncompletedTasks = [...state.uncompletedTasks, updatedTask];
        state.completedTasks = state.completedTasks.filter(
          (task) => task.id !== updatedTask.id
        );
      }
      const allTasks = [...state.uncompletedTasks, ...state.completedTasks];
      const updatingTask = allTasks.find((task) => task.id === updatedTask.id);
      if (updatingTask) {
        Object.assign(updatingTask, updatedTask);
      }
    }),
  createTask: (newTask: TodoItem) => {
    set((state: StoreState) => {
      state.uncompletedTasks = [newTask, ...state.uncompletedTasks];
    });
  },
  deleteTask: (deleteTask: TodoItem | null) =>
    set((state: StoreState) => {
      state.uncompletedTasks = state.uncompletedTasks.filter(
        (task) => task.id !== deleteTask?.id
      );
      state.completedTasks = state.completedTasks.filter(
        (task) => task.id !== deleteTask?.id
      );
    }),
  fetchTasks: async () => {
    const data = await new Promise<TodoItem[]>((res) => {
      setTimeout(() => {
        res(todos);
      }, 5000);
    });
    const uncompletedTasks = data.filter((task) => !task.status);
    const completedTasks = data.filter((task) => task.status);
    set({ uncompletedTasks, completedTasks });
  },
  fetchTags: async () => {
    await new Promise((res) => {
      setTimeout(res, 5000);
    });
    set({ tasks: todos });
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
