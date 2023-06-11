import { useForm, SubmitHandler } from 'react-hook-form';
import { useStore } from '@/store';
import { TaskCreateFormValues } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { shallow } from 'zustand/shallow';
import FormLayout from '../FormLayout';
import TaskCreateFormHeader from './Header';
import TaskCreateFormContent from './Content';
import TaskCreateFormFooter from './Footer';

export default function TaskCreateForm() {
  const [createTask, toggleTaskCreateDialog] = useStore(
    (state) => [state.createTask, state.toggleTaskCreateDialog],
    shallow,
  );
  const { control, handleSubmit } = useForm<TaskCreateFormValues>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TaskCreateFormValues> = (data: TaskCreateFormValues) => {
    const updatedTask = { ...data, id: uuidv4(), status: false };
    toggleTaskCreateDialog(false);
    createTask(updatedTask);
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
