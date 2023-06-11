import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/24/outline';
import Input from '../components/Input';
import TagsCombobox from '../components/TagsCombobox';
import Badge from '@/components/Badge';
import { useStore } from '@/store';
import { shallow } from 'zustand/shallow';
import { Tag, TagColor, TagsListEditFormValues } from '@/types';

export default function TagsListEditFormContent() {
  const [tags, addTag, deleteTag] = useStore(
    (state) => [state.tags, state.addTag, state.deleteTag],
    shallow
  );

  const { control, getValues, setValue } = useForm<TagsListEditFormValues>({
    defaultValues: {},
  });

  function handleAddTag() {
    const newTag = {
      id: uuidv4(),
      name: getValues('name'),
      color: getValues('color') as TagColor,
    };

    addTag(newTag);
    setValue('name', '');
  }

  function handleDeleteTag(tag: Tag) {
    deleteTag(tag);
  }
  return (
    <>
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
          className='col-span-2 self-end mb-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-700 border-dashed bg-white text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1'
          onClick={handleAddTag}
        >
          <span className='sr-only'>Add tag</span>
          <PlusIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </div>
      <div>
        <h4 className='block text-sm font-medium text-gray-900'>Tags</h4>
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
    </>
  );
}
