import { useForm, SubmitHandler } from 'react-hook-form';
import FormHeader from '../components/FormHeader';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import DateTimePicker from '../components/DateTimePicker';
// import Tags from '@components/Tags';
import Button from '@components/Button';
import { useStore } from '@/store';
import { TaskEditFormValues, TodoItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { shallow } from 'zustand/shallow';
import FormLayout from '../FormLayout';
import TaskCreateFormHeader from './Header';
import TaskCreateFormContent from './Content';
import TaskCreateFormFooter from './Footer';

export default function TaskCreateForm() {
  const [createTask, toggleTaskCreateDialog] = useStore(
    (state) => [state.createTask, state.toggleTaskCreateDialog],
    shallow
  );
  const { control, handleSubmit } = useForm<TaskEditFormValues>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TaskEditFormValues> = (data: TodoItem) => {
    const updatedTask = { ...data, id: uuidv4() };
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
