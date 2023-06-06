import { useForm, SubmitHandler } from 'react-hook-form';
import FormHeader from '@components/forms/FormHeader';
import Input from '@components/forms/Input';
import TextArea from '@components/forms/TextArea';
import DateTimePicker from '@components/forms/DateTimePicker';
import Tags from '@components/Tags';
import Button from '@components/Button';
import { useStore } from '@/store';
import { TaskEditFormValues, TodoItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function TaskCreateForm() {
  const selectingTask = {};
  const createTask = useStore((state) => state.createTask);
  const toggleTaskCreateDialog = useStore(
    (state) => state.toggleTaskCreateDialog
  );
  const { control, handleSubmit } = useForm<TaskEditFormValues>({
    defaultValues: { ...selectingTask },
  });
  const onSubmit: SubmitHandler<TaskEditFormValues> = (data: TodoItem) => {
    const updatedTask = { ...data, id: uuidv4() };
    toggleTaskCreateDialog(false);
    createTask(updatedTask);
  };

  return (
    <form
      className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex-1'>
        <FormHeader
          onClose={toggleTaskCreateDialog}
          title='Create task'
          description='Create your task.'
        />
        <div className='flex flex-1 flex-col justify-between '>
          <div className='divide-y divide-gray-200 px-4 sm:px-6'>
            <div className='space-y-2 pt-6 pb-5'>
              <Input
                label='Title'
                id='task-title'
                control={control}
                name='title'
              />
              <TextArea
                label='Description'
                id='task-description'
                control={control}
                name='description'
              />

              <div className='grid grid-cols-2 items-center gap-4'>
                <DateTimePicker
                  title='Choose start date'
                  label='Start date'
                  control={control}
                  name='startDate'
                />
                <DateTimePicker
                  title='Choose end date'
                  label='End date'
                  name='endDate'
                  control={control}
                />
                <DateTimePicker
                  title='Choose due date'
                  label='Due date'
                  name='dueDate'
                  control={control}
                />
              </div>
              <Tags />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-shrink-0 justify-end px-4 py-4'>
        <Button
          type='button'
          label='Cancel'
          onClick={() => toggleTaskCreateDialog(false)}
          color='white'
        />
        <Button type='submit' label='Create' className='ml-4' />
      </div>
    </form>
  );
}
