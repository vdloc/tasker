import {
  collection,
  doc,
  setDoc,
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
import { Tag, Task, User } from '@/types';

export const fireStore = getFirestore(firebaseApp);
export const tagRef = collection(fireStore, 'tag');
export const taskRef = collection(fireStore, 'task');
export const userRef = collection(fireStore, 'user');
const currentUser: any = {};

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

async function updateTask(task: Task) {
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

async function createTags(tags: Tag[]) {
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
  setCurrentUser,
};
