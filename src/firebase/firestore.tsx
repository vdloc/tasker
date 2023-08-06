import { FireStoreTask, Tag, Task, User } from '@/types';
import { getDataFromSnapshot } from '@/utils';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

import firebaseApp from './app';

export const fireStore = getFirestore(firebaseApp);
export const tagRef = collection(fireStore, 'tag');
export const taskRef = collection(fireStore, 'task');
export const userRef = collection(fireStore, 'user');
const currentUser: Partial<User> = {};

async function getTasks(userID: string): Promise<Task[]> {
  const tasksQuery = query(taskRef, where('userID', '==', userID));
  const querySnapshot = await getDocs(tasksQuery);

  return getDataFromSnapshot<Task[]>(querySnapshot);
}

async function getTags(userID: string): Promise<Tag[]> {
  const tagsQuery = query(tagRef, where('userID', '==', userID));
  const querySnapshot = await getDocs(tagsQuery);

  return getDataFromSnapshot<Tag[]>(querySnapshot);
}

async function getUser(uid: string): Promise<User> {
  const userQuery = query(userRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(userQuery);
  const users = getDataFromSnapshot<User[]>(querySnapshot);

  return users?.[0];
}

async function createUser(uid: string) {
  await setDoc(doc(fireStore, 'user', uid), { uid });
}

async function createTask(task: Task) {
  const docRef = doc(taskRef);
  task.id = docRef.id;
  task.userID = currentUser.uid as string;
  await setDoc(docRef, task);
}

async function createTag(tag: Tag) {
  const docRef = doc(tagRef);
  tag.id = docRef.id;
  tag.userID = currentUser.uid as string;
  await setDoc(docRef, tag);
}

async function updateTask(task: FireStoreTask) {
  const docRef = doc(fireStore, 'task', task.id as string);
  await updateDoc(docRef, task);
}

async function createTasks(tasks: Task[]) {
  const batch = writeBatch(fireStore);
  tasks.forEach((task) => {
    const docRef = doc(taskRef);
    task.id = docRef.id;
    task.userID = currentUser.uid;
    batch.set(docRef, task);
  });

  await batch.commit();
}

async function createTags(tags: Tag[]): Promise<Tag[]> {
  const batch = writeBatch(fireStore);
  tags.forEach((tag) => {
    const docRef = doc(tagRef);
    tag.id = docRef.id;
    tag.userID = currentUser.uid;
    batch.set(docRef, tag);
  });
  await batch.commit();
  return tags;
}

async function deleteTask(taskID: string) {
  await deleteDoc(doc(fireStore, 'task', taskID));
}

async function deleteTag(tagID: string) {
  await deleteDoc(doc(fireStore, 'tag', tagID));
}

async function deleteTags(tags: Tag[]) {
  const batch = writeBatch(fireStore);
  tags.forEach((tag) => {
    const docRef = doc(fireStore, 'tag', tag.id);
    batch.delete(docRef);
  });
  await batch.commit();
}

function setCurrentUser(user: User) {
  Object.assign(currentUser, user);
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
  deleteTag,
  deleteTags,
  setCurrentUser,
};
