import { database } from '@/firebase/firestore';
import { Task, StoreState } from '@/types';

const taskReducer = (set: any, get: any) => ({
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

export default taskReducer;
