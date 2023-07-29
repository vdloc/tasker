import { UserProfileFormValues } from '@/types';
import { classNames } from '@/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import { type Control, useController } from 'react-hook-form';

type AvatarProps = {
  control: Control<UserProfileFormValues>;
  name: keyof UserProfileFormValues;
  className?: string;
  alt: string;
};

export default function Avatar({ control, name, className, alt }: AvatarProps) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className={classNames(className, 'w-32 h-32 rounded-2xl shadow-2xl overflow-hidden')}>
      {field.value ? (
        <img src={field.value} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <UserIcon className="w-full h-full object-cover fill-indigo-500" />
      )}
    </div>
  );
}
