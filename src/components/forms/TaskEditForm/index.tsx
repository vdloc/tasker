import { useForm, SubmitHandler } from 'react-hook-form';
import FormLayout from '../FormLayout';
import { useStore } from '@/store';
import { TaskEditFormValues, TodoItem } from '@/types';
import TaskEditFormHeader from './Header';
import TaskEditFormContent from './Content';
import TaskEditFormFooter from './Footer';

export default function TaskEditForm() {
  const [selectingTask, updateTask, deleteTask, toggleTaskUpdateDialog, tags] =
    useStore((state) => [
      state.selectingTask,
      state.updateTask,
      state.deleteTask,
      state.toggleTaskUpdateDialog,
      state.tags,
    ]);
  const { control, handleSubmit } = useForm<TaskEditFormValues>({
    defaultValues: { ...selectingTask },
  });

  const currentTags = (selectingTask.tags || []).map((tag) =>
    tags.find(({ id }) => tag.id === id)
  );
  const onSubmit: SubmitHandler<TaskEditFormValues> = (data: TodoItem) => {
    const updatedTask = { ...selectingTask, ...data };
    console.log(updatedTask);

    toggleTaskUpdateDialog(false);
    updateTask(updatedTask);
  };

  function handleDeleteTask() {
    toggleTaskUpdateDialog(false);
    deleteTask(selectingTask);
  }

  return (
    <FormLayout
      Header={TaskEditFormHeader}
      Content={() => (
        <TaskEditFormContent control={control} currentTags={currentTags} />
      )}
      Footer={() => <TaskEditFormFooter onDeleteTask={handleDeleteTask} />}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
