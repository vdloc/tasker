import { Task } from '@/types';
import { type DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

type CompletedTasks = Task[];
type UncompletedTasks = Task[];

export function filterTasksByStatus(tasks: Task[]): [CompletedTasks, UncompletedTasks] {
  const completedTask: Task[] = [];
  const uncompletedTask: Task[] = [];

  tasks.forEach((task) => {
    task.status ? completedTask.push(task) : uncompletedTask.push(task);
  });

  return [completedTask, uncompletedTask];
}

export function getDataFromSnapshot<T>(querySnapshot: QuerySnapshot): T {
  const values: unknown[] = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    values.push(doc.data());
  });

  return values as T;
}
