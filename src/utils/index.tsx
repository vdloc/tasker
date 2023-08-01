import { Task } from '@/types';
import firebaseErrorMessages from '@data/firebaseErrors.json';
import { FirebaseError } from 'firebase/app';
import {
  type DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';

export function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

type CompletedTasks = Task[];
type UncompletedTasks = Task[];

export function filterTasksByStatus(
  tasks: Task[]
): [CompletedTasks, UncompletedTasks] {
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

export function getAuthErrorMessage(errorCode: FirebaseError['code']) {
  const errorMessages = firebaseErrorMessages.auth as Record<string, string>;
  return errorMessages[errorCode] || `Authentication error: ${errorCode}`;
}

export function getFirestoreErrorMessage(errorCode: FirebaseError['code']) {
  const errorMessages = firebaseErrorMessages.firestore as Record<
    string,
    string
  >;
  return errorMessages[errorCode] || `Database error: ${errorCode}`;
}
