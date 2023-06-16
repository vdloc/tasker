// import { useStore } from '@/store';
import { PlusIcon } from '@heroicons/react/24/outline';
import Badge from '../common/Badge';
import { FormInputProps, Tag } from '@/types';
import { useController } from 'react-hook-form';
import { useEffect, useState } from 'react';
import TagsDropDown from '../TagsDropDown';

type TagsProps = {
  defaultTags: (Tag | undefined)[];
};

export default function Tags({ label, control, name, defaultTags }: TagsProps & FormInputProps) {
  const { field } = useController({
    name,
    control,
  });
  const [tags, setTags] = useState(defaultTags);

  function handleRemoveTag(removeTag: Tag) {
    const updatedTags = tags.filter((tag) => removeTag.id !== tag?.id);
    setTags(updatedTags);
    field.onChange(updatedTags);
  }

  function handleAddTag(tag: Tag) {
    const updatedTags = [...tags, tag];
    setTags(updatedTags);
    field.onChange(updatedTags);
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">{label}</h3>
      <div className="mt-2">
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap items-center">
            {(tags as Tag[]).map((tag) => (
              <Badge key={tag.id} title={tag.name} color={tag.color} onClose={() => handleRemoveTag(tag)} />
            ))}
            <TagsDropDown onChange={handleAddTag} excludeTags={tags} />
          </div>
          <div className="flex"></div>
        </div>
      </div>
    </div>
  );
}
