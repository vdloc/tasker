import { useForm, SubmitHandler } from 'react-hook-form';
import { useStore } from '@/store';
import { TaskCreateFormValues } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import FormLayout from '../FormLayout';
import TaskCreateFormHeader from './Header';
import TaskCreateFormContent from './Content';
import TaskCreateFormFooter from './Footer';
import { database } from '@/firebase/firestore';

export default function TaskCreateForm() {
  const toggleTaskCreateDialog = useStore((state) => state.toggleTaskCreateDialog);
  const createTask = useStore((state) => state.createTask);
  const user = useStore((state) => state.user);
  const { control, handleSubmit } = useForm<TaskCreateFormValues>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TaskCreateFormValues> = async (data: TaskCreateFormValues) => {
    const updatedTask = { ...data, id: uuidv4(), status: false, tags: data.tags || [], userID: user?.uid };
    const result = await database.createTask(updatedTask);
    createTask(result.task);
    toggleTaskCreateDialog(false);
  };

  return (
    <FormLayout
      Header={TaskCreateFormHeader}
      Content={() => <TaskCreateFormContent control={control} />}
      Footer={TaskCreateFormFooter}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
