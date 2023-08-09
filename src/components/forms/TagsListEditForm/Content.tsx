import Badge from '@/components/common/Badge';
import { useTagStore } from '@/store';
import { Tag, TagColor, TagsListEditFormValues } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '../components/Input';
import Label from '../components/Label';
import TagsCombobox from '../components/TagsCombobox';

export default function TagsListEditFormContent() {
  const { tags, addTag, deleteTag } = useTagStore();

  const { control, getValues, setValue, trigger } = useForm<TagsListEditFormValues>({
    defaultValues: { tagName: '', color: '' as TagColor },
  });

  const existedTagValidator = useCallback(
    (tagName: string) => {
      const isTagExisted = tags.some((tag: Tag) => tag.name === tagName);

      return isTagExisted ? 'Tag already existed!' : true;
    },
    [tags],
  );

  async function handleAddTag() {
    const newTag = {
      id: Math.round(Math.random() * 10),
      name: getValues('tagName'),
      color: getValues('color') as TagColor,
    };

    try {
      const isTagNameValidate = await trigger('tagName', { shouldFocus: true });
      if (isTagNameValidate) {
        addTag(newTag);
        setValue('tagName', '');
        toast.success(`Tag "${newTag.name}" was successfully created.`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleDeleteTag(tag: Tag) {
    deleteTag(tag);
  }
  return (
    <>
      <div className="grid grid-cols-10 gap-4 relative">
        <Input
          control={control}
          name="tagName"
          label="Name"
          id="tag-name"
          className="col-span-4"
          placeholder="Enter tag name"
          rules={{
            required: { value: true, message: 'Tag name must be required!' },
            maxLength: {
              value: 20,
              message: 'Tag name is maximum of 20 characters only!',
            },
            minLength: {
              value: 3,
              message: 'Tag name is at least 3 characters!',
            },
            validate: existedTagValidator,
          }}
        />
        <TagsCombobox label="Color" className="col-span-4" control={control} name="color" />
        <div className="col-span-2 mb-1">
          <button
            type="button"
            title="Add tag"
            className="inline-flex absolute top-7 h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-700 border-dashed bg-white text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            onClick={handleAddTag}
          >
            <span className="sr-only">Add tag</span>
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className='mt-2'>
        <Label label="Tags" />
        <div className="flex gap-2 flex-wrap mt-1">
          {tags &&
            tags.map((tag: Tag) => (
              <Badge key={tag.id} title={tag.name} color={tag.color} onClose={() => handleDeleteTag(tag)} />
            ))}
        </div>
      </div>
    </>
  );
}
