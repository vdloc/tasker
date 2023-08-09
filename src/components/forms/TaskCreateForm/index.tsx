import { useDialogStore, useSettingsStore, useTaskStore } from '@/store';
import { TaskCreateFormValues } from '@/types';
import { getFirestoreErrorMessage } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import FormLayout from '../FormLayout';
import TaskCreateFormContent from './Content';
import TaskCreateFormFooter from './Footer';
import TaskCreateFormHeader from './Header';

export default function TaskCreateForm() {
  const { toggleTaskCreateDialog } = useDialogStore();
  const { createTask } = useTaskStore();
  const { user } = useSettingsStore();
  const { control, handleSubmit } = useForm<TaskCreateFormValues>({
    defaultValues: {
      createDate: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      title: '',
      description: '',
      id: uuidv4(),
      tags: [],
    },
  });
  const onSubmit: SubmitHandler<TaskCreateFormValues> = async (data: TaskCreateFormValues) => {
    const updatedTask = {
      ...data,
      status: false,
      tags: data.tags || [],
      userID: user?.uid as string,
    };

    try {
      await createTask(updatedTask);
      toast.success('Your task has been created!');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorMessage = getFirestoreErrorMessage(firebaseError.code);
      toast.error(errorMessage);
    } finally {
      toggleTaskCreateDialog(false);
    }
  };

  const content = useCallback(() => <TaskCreateFormContent control={control} />, [control]);

  return (
    <FormLayout
      Header={TaskCreateFormHeader}
      Content={content}
      Footer={TaskCreateFormFooter}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
