// import { useStore } from '@/store';
import { PlusIcon } from '@heroicons/react/24/outline';
import Badge from '../Badge';
import { FormInputProps, Tag } from '@/types';
import { useController } from 'react-hook-form';
import { useEffect, useState } from 'react';

type TagsProps = {
  defaultTags: (Tag | undefined)[];
};

export default function Tags({
  label,
  control,
  name,
  defaultTags,
}: TagsProps & FormInputProps) {
  const { field } = useController({
    name,
    control,
  });
  const [tags, setTags] = useState(defaultTags);

  function handleRemoveTag(removeTag: Tag) {
    setTags(tags.filter((tag) => removeTag.id !== tag?.id));
  }

  useEffect(() => {
    field.onChange(tags);
  }, [tags]);

  return (
    <div>
      <h3 className='text-sm font-medium text-gray-900'>{label}</h3>
      <div className='mt-2'>
        <div className='space-y-2'>
          <div className='flex gap-2 flex-wrap'>
            {(tags as Tag[]).map((tag) => (
              <Badge
                key={tag.id}
                title={tag.name}
                color={tag.color}
                onClose={() => handleRemoveTag(tag)}
              />
            ))}
          </div>
          <div className='flex'>
            <button
              type='button'
              title='Add tag'
              className='inline-flex w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              <span className='sr-only'>Add tag</span>
              <PlusIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
