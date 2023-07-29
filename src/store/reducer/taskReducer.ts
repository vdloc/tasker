import { database, taskRef } from '@/firebase/firestore';
import { FireStoreTask, Task } from '@/types';
import { filterTasksByStatus, getDataFromSnapshot } from '@/utils';
import { onSnapshot, query } from 'firebase/firestore';

const taskReducer = (set: any, get: any) => ({
  uncompletedTasks: [],
  completedTasks: [],
  selectingTask: {} as Task,
  isShowCompletedTasks: false,
  toggleShowCompletedTasks: (isShow: boolean) => set({ isShowCompletedTasks: isShow }),
  setSelectingTask: (task: Task) => set(() => ({ selectingTask: task })),
  fetchTasks: async () => {
    const user = get().user;
    if (!user) return;
    const tasks = await database.getTasks(user.id);
    const [completedTasks, uncompletedTasks] = filterTasksByStatus(tasks);
    set({ uncompletedTasks, completedTasks });
  },
  updateTask: async (updatedTask: Task) => {
    await database.updateTask(updatedTask as FireStoreTask);
  },
  createTask: async (newTask: Task) => {
    await database.createTask(newTask);
  },
  createTasks: async (newTasks: Task[]) => {
    await database.createTasks(newTasks);
  },
  deleteTask: async (deleteTask: Task) => {
    await database.deleteTask(deleteTask.id as string);
  },
  listenOnTasksChanged() {
    const taskQuery = query(taskRef);
    const unsubscribe = onSnapshot(taskQuery, (querySnapshot) => {
      const tasks = getDataFromSnapshot<Task[]>(querySnapshot);
      const [completedTasks, uncompletedTasks] = filterTasksByStatus(tasks);
      set({ uncompletedTasks, completedTasks });
    });

    return unsubscribe;
  },
});

export default taskReducer;
