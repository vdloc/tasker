import { UserProfileFormValues } from '@/types';
import { Control } from 'react-hook-form';

import Avatar from '../components/Avatar';
import Input from '../components/Input';

type UserProfileFormContentProps = {
  control: Control<UserProfileFormValues>;
};

export default function UserProfileFormContent({ control }: UserProfileFormContentProps) {
  return (
    <>
      <div className="flex justify-center">
        <Avatar control={control} name="photoURL" alt="" />
      </div>
      <Input control={control} label="Display name" name="displayName" />
      <Input control={control} label="Email" name="email" />
      <Input control={control} label="Photo URL" name="photoURL" />
    </>
  );
}
