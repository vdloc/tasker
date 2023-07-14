import { TaskCreateFormValues } from '@/types';
import DateTimePicker from '../components/DateTimePicker';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { Control } from 'react-hook-form';
import Tags from '@/components/Tags';

type TaskCreateFormContentProps = {
  control: Control<TaskCreateFormValues>;
};

const titleRules = {
  required: { value: true, message: 'Task title is required!' },
  maxLength: { value: 255, message: 'Task title is maximum of 255 characters only!' },
  minLength: { value: 3, message: 'Task title is at least 3 characters!' },
};

const descritionRules = {
  maxLength: { value: 1000, message: 'Task description is maximum of 255 characters only!' },
  minLength: { value: 3, message: 'Task description is at least 3 characters!' },
};

export default function TaskCreateFormContent({ control }: TaskCreateFormContentProps) {
  return (
    <>
      <Input label="Title" id="task-title" control={control} name="title" rules={titleRules} />
      <TextArea
        label="Description"
        id="task-description"
        control={control}
        name="description"
        rules={descritionRules}
      />
      <div className="grid grid-cols-2 items-center gap-4">
        <DateTimePicker title="Choose start date" label="Start date" control={control} name="startDate" />
        <DateTimePicker title="Choose due date" label="Due date" name="dueDate" control={control} />
      </div>
      <Tags label="Tags" name="tags" control={control} defaultTags={[]} />
    </>
  );
}
