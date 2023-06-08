import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, TodoItem, Tag } from './types';
import { devtools, persist } from 'zustand/middleware';
import todos from '@/data/todos.json';
import tags from '@/data/tags.json';

const createTasksSlice = (set: any) => ({
  uncompletedTasks: [],
  completedTasks: [],
  selectingTask: {} as TodoItem,
  isShowCompletedTasks: false,
  toggleShowCompletedTasks: (isShow: boolean) =>
    set({ isShowCompletedTasks: isShow }),
  setSelectingTask: (task: TodoItem) => set(() => ({ selectingTask: task })),
  updateTask: (updatedTask: TodoItem) =>
    set((state: StoreState) => {
      const isTaskCompleted = state.completedTasks.find(
        (task) => task.id === updatedTask.id
      );
      if (updatedTask.status && !isTaskCompleted) {
        state.completedTasks = [updatedTask, ...state.completedTasks];
        state.uncompletedTasks = state.uncompletedTasks.filter(
          (task) => task.id !== updatedTask.id
        );
      } else if (!updatedTask.status && isTaskCompleted) {
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
  deleteTask: (deleteTask: TodoItem) =>
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
});

const createTagSlice = (set: any) => ({
  tags: [],
  addTag: (tag: Tag) =>
    set((state: StoreState) => ({ tags: [...state.tags, tag] })),
  deleteTag: (tag: Tag) =>
    set((state: StoreState) => ({
      tags: state.tags.filter(({ id }) => id !== tag.id),
    })),
  fetchTags: async () => {
    const data = await new Promise<Tag[]>((res) => {
      setTimeout(() => {
        res(tags as Tag[]);
      }, 5000);
    });
    set({ tags: data });
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
  ...createTagSlice(set),
});

const createStore = devtools(
  persist(immer(initializer), { name: 'todo', skipHydration: true })
);

export const useStore = create<StoreState>()(createStore);
