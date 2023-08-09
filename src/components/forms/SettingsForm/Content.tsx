import { SettingsFormValues } from '@/types';
import { Control, useController } from 'react-hook-form';

import Avatar from '../components/Avatar';
import Input from '../components/Input';
import Toggle from '../components/Toggle';

type SettingsFormContentProps = {
  control: Control<SettingsFormValues>;
};

export default function SettingsFormContent({ control }: SettingsFormContentProps) {
  const { field } = useController({
    name: 'displayName',
    control,
  });
  const avatarAlt = field.value ? `${field.value}'s avatar` : 'avatar';

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-center">
          <Avatar control={control} name="photoURL" alt={avatarAlt} />
        </div>
        <Input control={control} label="Display name" name="displayName" />
        <Input control={control} label="Email" name="email" />
        <Input control={control} label="Photo URL" name="photoURL" />
      </div>
      <div>
        <hr className="mt-3 mb-1" />
        <Toggle control={control} label="Dark mode" name="darkMode" />
      </div>
    </>
  );
}
