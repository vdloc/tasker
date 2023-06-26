import { useForm, SubmitHandler } from 'react-hook-form';
import FormLayout from '../FormLayout';
import { useStore } from '@/store';
import { Tag, TaskEditFormValues, TodoItem } from '@/types';
import TaskEditFormHeader from './Header';
import TaskEditFormContent from './Content';
import TaskEditFormFooter from './Footer';
import { useEffect, useState } from 'react';
import { database } from '@/firebase/firestore';
import { shallow } from 'zustand/shallow';

export default function TaskEditForm() {
  const [selectingTask, toggleTaskUpdateDialog, tags = []] = useStore(
    (state) => [state.selectingTask, state.toggleTaskUpdateDialog, state.tags],
    shallow,
  );
  const { control, handleSubmit } = useForm<TaskEditFormValues>({
    defaultValues: { ...selectingTask },
  });
  const [currentTags, setCurrentTags] = useState(getCurrentTags(selectingTask));

  function getCurrentTags(selectingTask: TodoItem) {
    if (!selectingTask || !selectingTask.tags || !selectingTask.tags.length) return [];
    return (selectingTask.tags as Tag[]).filter((tag) => tags.find(({ id }) => tag.id === id));
  }

  const onSubmit: SubmitHandler<TaskEditFormValues> = (data: TaskEditFormValues) => {
    const updatedTask = { ...selectingTask, ...data };
    console.log('​updatedTask', updatedTask);
    setCurrentTags(data.tags as Tag[]);
    database.updateTask(updatedTask);
    toggleTaskUpdateDialog(false);
  };

  async function handleDeleteTask() {
    console.log('Foo');

    await database.deleteTask(selectingTask.id as string);
    toggleTaskUpdateDialog(false);
    // deleteTask(selectingTask);
  }
  useEffect(() => {
    console.log('Foo');
    return () => {
      console.log('Bar');
    };
  }, []);

  return (
    <FormLayout
      Header={TaskEditFormHeader}
      Content={() => <TaskEditFormContent control={control} currentTags={currentTags} />}
      Footer={() => <TaskEditFormFooter onDeleteTask={handleDeleteTask} />}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
