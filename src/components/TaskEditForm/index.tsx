import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import FormHeader from '../forms/FormHeader';
import Input from '../forms/Input';
import TextArea from '../forms/TextArea';
import { useStore } from '@/store';
import { TaskEditFormValues } from '@/types';
import Toggle from '../forms/Toggle';
import Tags from '../Tags';
import DateTimePicker from '../forms/DateTimePicker';

export default function TaskEditForm() {
  const { control, handleSubmit } = useForm<TaskEditFormValues>();
  const onSubmit: SubmitHandler<TaskEditFormValues> = (data) =>
    console.log(data);
  const onError: SubmitErrorHandler<TaskEditFormValues> = (errors, e) =>
    console.log(errors, e);
  const toggleTaskUpdatePopup = useStore(
    (state) => state.toggleTaskUpdatePopup
  );

  return (
    <form
      className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='h-0 flex-1'>
        <FormHeader
          onClose={toggleTaskUpdatePopup}
          title='Edit task'
          description='Update task status, change due date or delete task'
        />
        <div className='flex flex-1 flex-col justify-between'>
          <div className='divide-y divide-gray-200 px-4 sm:px-6'>
            <div className='space-y-6 pt-6 pb-5'>
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
              <Toggle
                label='Status'
                control={control}
                id='task-stastus'
                name='status'
              />
              <DateTimePicker />
              <Tags />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-shrink-0 justify-end px-4 py-4'>
        <button
          type='button'
          className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => toggleTaskUpdatePopup(false)}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Save
        </button>
      </div>
    </form>
  );
}
