import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/24/outline';
import Input from '../components/Input';
import TagsCombobox from '../components/TagsCombobox';
import Badge from '@/components/common/Badge';
import { useTagStore } from '@/store';
import { shallow } from 'zustand/shallow';
import { Tag, TagColor, TagsListEditFormValues } from '@/types';
import { database } from '@/firebase/firestore';
import { useMutation } from '@/firebase/hooks/useMutation';

export default function TagsListEditFormContent() {
  const { tags, addTag, deleteTag } = useTagStore((state) => state, shallow);
  const [mutation, _, loading, error] = useMutation();

  const { control, getValues, setValue, trigger, formState } = useForm<TagsListEditFormValues>({
    defaultValues: { name: '', color: '' as TagColor },
  });

  async function handleAddTag() {
    const newTag = {
      id: uuidv4(),
      name: getValues('name'),
      color: getValues('color') as TagColor,
    };

    try {
      await trigger('name', { shouldFocus: true });
      if (formState.isValid) {
        mutation(async () => await database.createTag(newTag as Tag));
        setValue('name', '');
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
          name="name"
          label="Name"
          id="tag-name"
          className="col-span-4"
          rules={{
            required: { value: true, message: 'Tag name must be required!' },
            maxLength: {
              value: 1000,
              message: 'Tag name is maximum of 20 characters only!',
            },
            minLength: {
              value: 3,
              message: 'Tag name is at least 3 characters!',
            },
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
      <div>
        <h4 className="block text-sm font-medium text-gray-900">Tags</h4>
        <div className="flex gap-2 flex-wrap mt-4">
          {tags &&
            tags.map((tag) => (
              <Badge key={tag.id} title={tag.name} color={tag.color} onClose={() => handleDeleteTag(tag)} />
            ))}
        </div>
      </div>
    </>
  );
}
