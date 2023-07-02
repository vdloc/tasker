import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, Task, Tag, User } from './types';
import { devtools, persist } from 'zustand/middleware';
import { database } from './firebase/firestore';

const createTasksSlice = (set: any, get: any) => ({
  uncompletedTasks: [],
  completedTasks: [],
  selectingTask: {} as Task,
  isShowCompletedTasks: false,
  toggleShowCompletedTasks: (isShow: boolean) => set({ isShowCompletedTasks: isShow }),
  setSelectingTask: (task: Task) => set(() => ({ selectingTask: task })),
  updateTask: (updatedTask: Task) =>
    set((state: StoreState) => {
      const isTaskCompleted = state.completedTasks.some((task) => task.id === updatedTask.id);
      if (updatedTask.status && !isTaskCompleted) {
        state.completedTasks = [updatedTask, ...state.completedTasks];
        state.uncompletedTasks = state.uncompletedTasks.filter((task) => task.id !== updatedTask.id);
      } else if (!updatedTask.status && isTaskCompleted) {
        state.uncompletedTasks = [...state.uncompletedTasks, updatedTask];
        state.completedTasks = state.completedTasks.filter((task) => task.id !== updatedTask.id);
      }
      const allTasks = [...state.uncompletedTasks, ...state.completedTasks];
      const updatingTask = allTasks.find((task) => task.id === updatedTask.id);
      if (updatingTask) {
        Object.assign(updatingTask, updatedTask);
      }
    }),
  createTask: (newTask: Task) => {
    set((state: StoreState) => {
      state.uncompletedTasks = [newTask, ...state.uncompletedTasks];
    });
  },
  createTasks: (newTasks: Task[]) => {
    set((state: StoreState) => {
      state.uncompletedTasks = [...newTasks, ...state.uncompletedTasks];
    });
  },
  deleteTask: (deleteTask: Task) =>
    set((state: StoreState) => {
      state.uncompletedTasks = state.uncompletedTasks.filter((task) => task.id !== deleteTask?.id);
      state.completedTasks = state.completedTasks.filter((task) => task.id !== deleteTask?.id);
    }),
  fetchTasks: async () => {
    const user = get().user;
    const data = (await database.getTasks(user.uid)) as Task[];
    const uncompletedTasks = data.filter((task) => !task.status);
    const completedTasks = data.filter((task) => task.status);
    set({ uncompletedTasks, completedTasks });
  },
});

const createTagSlice = (set: any) => ({
  tags: [],
  setTags: (tags: Tag[]) => set({ tags }),
  addTag: (tag: Tag) => set((state: StoreState) => ({ tags: [...state.tags, tag] })),
  addTags: (tags: Tag[]) => set((state: StoreState) => ({ tags: [...state.tags, ...tags] })),
  deleteTag: (tag: Tag) =>
    set((state: StoreState) => ({
      tags: state.tags.filter(({ id }) => id !== tag.id),
    })),
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

const createUserSlice = (set: any) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  isUserProfileOpen: false,
  toggleUserProfileDialog: (isShow: boolean) => set({ isUserProfileOpen: isShow }),
});

const initializer: StateCreator<StoreState, [['zustand/persist', unknown], ['zustand/immer', never]]> = (set, get) => ({
  ...createTasksSlice(set, get),
  ...createDialogSlice(set),
  ...createTagSlice(set),
  ...createUserSlice(set),
});

const createStore = devtools(persist(immer(initializer), { name: 'todo' }));

export const useStore = create<StoreState>()(createStore);
