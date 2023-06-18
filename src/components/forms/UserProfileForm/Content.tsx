import { Control } from 'react-hook-form';
import Input from '../components/Input';
import { UserProfileFormValues } from '@/types';
import Avatar from '../components/Avatar';

type UserProfileFormContentProps = {
  control: Control<UserProfileFormValues>;
};

export default function UserProfileFormContent({ control }: UserProfileFormContentProps) {
  return (
    <>
      <div className="flex justify-center mb-4">
        <Avatar control={control} name="photoURL" alt="" />
      </div>
      <Input control={control} label="Display name" name="displayName" />
      <Input control={control} label="Email" name="email" />
      <Input control={control} label="Photo URL" name="photoURL" />
    </>
  );
}
