import { useForm, SubmitHandler } from 'react-hook-form';
import FormHeader from '@components/forms/FormHeader';
import Input from '@components/forms/Input';
import { useStore } from '@/store';
import { Tag, TagColor, TagsListEditFormValues } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/24/outline';
import { shallow } from 'zustand/shallow';
import TagsCombobox from './forms/TagsCombobox';
import Badge from './Badge';

export default function TagsEditForm() {
  const [tags, toggleTagsListEditDialog, addTag, deleteTag] = useStore(
    (state) => [
      state.tags,
      state.toggleTagsListEditDialog,
      state.addTag,
      state.deleteTag,
    ],
    shallow
  );

  const { control, handleSubmit, getValues } = useForm<TagsListEditFormValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<TagsListEditFormValues> = (
    data: TagsListEditFormValues
  ) => {
    console.log(data);

    const updatedTask = { ...data, id: uuidv4() };
  };

  function handleCloseDialog() {
    toggleTagsListEditDialog(false);
  }

  function handleAddTag() {
    const newTag = {
      id: uuidv4(),
      name: getValues('name'),
      color: getValues('color') as TagColor,
    };

    addTag(newTag);
  }

  function handleDeleteTag(tag: Tag) {
    deleteTag(tag);
  }

  return (
    <form
      className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex-1'>
        <FormHeader
          onClose={toggleTagsListEditDialog}
          title='Tags management'
          description='Create or delete tags.'
        />
        <div className='flex flex-1 flex-col justify-between '>
          <div className='divide-y divide-gray-200 px-4 sm:px-6'>
            <div className='space-y-2 pt-6 pb-5'>
              <div className='grid grid-cols-10 gap-4'>
                <Input
                  control={control}
                  name='name'
                  label='Name'
                  id='tag-name'
                  className='col-span-4'
                />
                <TagsCombobox
                  label='Color'
                  className='col-span-4'
                  control={control}
                  name='color'
                />
                <button
                  type='button'
                  title='Add tag'
                  className='col-span-2 self-end inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1'
                  onClick={handleAddTag}
                >
                  <span className='sr-only'>Add tag</span>
                  <PlusIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
              <div>
                <h4 className='block text-sm font-medium text-gray-900'>
                  Tags
                </h4>
                <div className='flex gap-2 flex-wrap mt-4'>
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      title={tag.name}
                      color={tag.color}
                      onClose={() => handleDeleteTag(tag)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-shrink-0 justify-end px-4 py-4'>
        <button
          type='button'
          className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={handleCloseDialog}
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
