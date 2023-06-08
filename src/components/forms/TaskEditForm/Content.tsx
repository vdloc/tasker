import Tags from '@/components/Tags';
import DateTimePicker from '../components/DateTimePicker';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Toggle from '../components/Toggle';
import { Control } from 'react-hook-form';
import { Tag, TaskEditFormValues } from '@/types';

type TaskEditFormContentProps = {
  control: Control<TaskEditFormValues>;
  currentTags: (Tag | undefined)[];
};

export default function TaskEditFormContent({
  control,
  currentTags,
}: TaskEditFormContentProps) {
  return (
    <>
      <Input label='Title' id='task-title' control={control} name='title' />
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
        <Toggle
          label='Status'
          control={control}
          id='task-stastus'
          name='status'
        />
      </div>
      <div className='flex gap-4'>
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
      <Tags
        label='Tags'
        name='tags'
        control={control}
        defaultTags={currentTags}
      />
    </>
  );
}
