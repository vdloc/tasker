import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  getFirestore,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore';
import firebaseApp from './app';
import { TodoItem } from '@/types';

export const fireStore = getFirestore(firebaseApp);

export const tagRef = collection(fireStore, 'tag');
export const taskRef = collection(fireStore, 'task');
export const userRef = collection(fireStore, 'user');

async function getTasks(userID: string) {
  const userRef = doc(fireStore, 'user', userID);
  const tasksQuery = query(taskRef, where('user', '==', userRef));
  const querySnapshot = await getDocs(tasksQuery);
  const tasks = [] as DocumentData[];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    tasks.push(doc.data());
  });

  return tasks;
}

async function getTags() {
  const tagsQuery = query(tagRef);
  const querySnapshot = await getDocs(tagsQuery);
  const tags = [] as DocumentData[];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    tags.push(doc.data());
  });

  return tags;
}

async function getUser(uid: string) {
  const userQuery = query(userRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(userQuery);
  const users = [] as DocumentData[];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    users.push(doc.data());
  });

  return users?.[0];
}

async function createUser(uid: string) {
  await setDoc(doc(fireStore, 'user', uid), { uid });
}

// async function createTask(task: TodoItem, userID: string) {
//   await
// }

async function createTask(task: TodoItem) {
  const docRef = doc(taskRef);
  task.id = docRef.id;
  const result: any = {
    task: null,
    error: null,
    loading: true,
  };
  try {
    await setDoc(docRef, task);
    result.task = task;
  } catch (error) {
    result.error = error;
  } finally {
    result.loading = false;
  }

  return result;
}

export const database = { getTasks, getTags, getUser, createUser, createTask };
