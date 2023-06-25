import { fireStore, taskRef } from '@/firebase/firestore';
import { TodoItem } from '@/types';
import { doc, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// function useUpdateTask(updatedTask: TodoItem) {
//   const taskRef = doc(fireStore, 'task', updatedTask.id);
// }

async function createTask(task: TodoItem) {
  const docRef = doc(taskRef);
  task.id = docRef.id;
  let loading = true,
    createdTask = task;

  const unsub = onSnapshot(docRef, (doc) => {
    const data = doc.data();
    loading = false;
    createdTask = data as TodoItem;
  });

  try {
    await setDoc(docRef, task);
    return task;
  } catch (error) {
    return error;
  }
}
