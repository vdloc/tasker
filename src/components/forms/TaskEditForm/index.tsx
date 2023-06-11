import { useForm, SubmitHandler } from 'react-hook-form';
import FormLayout from '../FormLayout';
import { useStore } from '@/store';
import { Tag, TaskEditFormValues, TodoItem } from '@/types';
import TaskEditFormHeader from './Header';
import TaskEditFormContent from './Content';
import TaskEditFormFooter from './Footer';
import { useState } from 'react';

export default function TaskEditForm() {
  const [selectingTask, updateTask, deleteTask, toggleTaskUpdateDialog, tags] = useStore((state) => [
    state.selectingTask,
    state.updateTask,
    state.deleteTask,
    state.toggleTaskUpdateDialog,
    state.tags,
  ]);
  const { control, handleSubmit } = useForm<TaskEditFormValues>({
    defaultValues: { ...selectingTask },
  });
  const [currentTags, setCurrentTags] = useState(getCurrentTags(selectingTask));

  function getCurrentTags(selectingTask: TodoItem) {
    if (!selectingTask || !selectingTask.tags) return [];
    return (selectingTask.tags as Tag[]).map((tag) => tags.find(({ id }) => tag.id === id));
  }

  const onSubmit: SubmitHandler<TaskEditFormValues> = (data: TaskEditFormValues) => {
    const updatedTask = { ...selectingTask, ...data };
    setCurrentTags(data.tags);
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
      Content={() => <TaskEditFormContent control={control} currentTags={currentTags} />}
      Footer={() => <TaskEditFormFooter onDeleteTask={handleDeleteTask} />}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
