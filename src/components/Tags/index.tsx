import { FormInputProps, Tag } from '@/types';
import { useState } from 'react';
import { useController } from 'react-hook-form';

import TagsDropDown from '../TagsDropDown';
import Badge from '../common/Badge';
import Label from '../forms/components/Label';

type TagsProps = {
  defaultTags: (Tag | undefined)[];
};

export default function Tags({ label, control, name, defaultTags }: TagsProps & FormInputProps) {
  const { field } = useController({
    name,
    control,
  });
  const [tags = [], setTags] = useState(defaultTags);

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
      <Label label={label} />
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
