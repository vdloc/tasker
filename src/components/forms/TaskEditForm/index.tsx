import { database } from '@/firebase/firestore';
import { useDialogStore, useTagStore, useTaskStore } from '@/store';
import { Tag, Task, TaskEditFormValues } from '@/types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormLayout from '../FormLayout';
import TaskEditFormContent from './Content';
import TaskEditFormFooter from './Footer';
import TaskEditFormHeader from './Header';

export default function TaskEditForm() {
  const { selectingTask } = useTaskStore();
  const { toggleTaskUpdateDialog } = useDialogStore();
  const { tags } = useTagStore() || [];
  const { control, handleSubmit } = useForm<TaskEditFormValues>({
    defaultValues: { ...selectingTask },
  });
  const [currentTags, setCurrentTags] = useState(getCurrentTags(selectingTask));

  function getCurrentTags(selectingTask: Task) {
    if (!selectingTask || !selectingTask.tags || !selectingTask.tags.length) return [];
    return (selectingTask.tags as Tag[]).filter((tag) => tags.find(({ id }: Tag) => tag.id === id));
  }

  const onSubmit: SubmitHandler<TaskEditFormValues> = (data: TaskEditFormValues) => {
    const updatedTask = { ...selectingTask, ...data };
    setCurrentTags(data.tags as Tag[]);
    database.updateTask(updatedTask);
    toggleTaskUpdateDialog(false);
  };

  async function handleDeleteTask() {
    await database.deleteTask(selectingTask.id as string);
    toggleTaskUpdateDialog(false);
  }

  return (
    <FormLayout
      Header={TaskEditFormHeader}
      Content={() => <TaskEditFormContent control={control} currentTags={currentTags} />}
      Footer={() => <TaskEditFormFooter onDeleteTask={handleDeleteTask} />}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
