import { SettingsFormValues } from '@/types';
import { classNames } from '@/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import { type Control, useController } from 'react-hook-form';

type AvatarProps = {
  control: Control<SettingsFormValues>;
  name: keyof SettingsFormValues;
  className?: string;
  alt: string | null;
};

export default function Avatar({ control, name, className, alt }: AvatarProps) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className={classNames(className, 'w-32 h-32 rounded-2xl shadow-2xl overflow-hidden')}>
      {field.value ? (
        <img src={field.value as string} alt={alt as string} className="w-full h-full object-cover" />
      ) : (
        <UserIcon className="w-full h-full object-cover fill-indigo-500" />
      )}
    </div>
  );
}
