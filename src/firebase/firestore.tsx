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
  updateDoc,
  writeBatch,
  deleteDoc,
} from 'firebase/firestore';
import firebaseApp from './app';
import { Tag, TodoItem } from '@/types';

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

async function createTag(tag: Tag) {
  const docRef = doc(tagRef);
  tag.id = docRef.id;

  try {
    await setDoc(docRef, tag);
  } catch (error) {
    console.log(error);
  }
}

async function updateTask(task: TodoItem) {
  const docRef = doc(fireStore, 'task', task.id as string);
	console.log("​updateTask -> task.id", task.id)

  try {
    await updateDoc(docRef, task);
  } catch (error) {
		console.log("​}catch -> error", error)
    return error;
  }
}

async function createTasks(tasks: TodoItem[]) {
  const batch = writeBatch(fireStore);
  tasks.forEach((task) => {
    const docRef = doc(taskRef);
    task.id = docRef.id;
    batch.set(docRef, task);
  });

  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}

async function createTags(tags: Tag[]) {
  const batch = writeBatch(fireStore);
  tags.forEach((tag) => {
    const docRef = doc(tagRef);
    tag.id = docRef.id;
    batch.set(docRef, tag);
  });

  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTask(taskID: string) {
  try {
    await deleteDoc(doc(fireStore, 'task', taskID));
  } catch (error) {
    console.log(error);
  }
}

export const database = {
  getTasks,
  getTags,
  getUser,
  createUser,
  createTask,
  updateTask,
  createTasks,
  deleteTask,
  createTag,
  createTags,
};
