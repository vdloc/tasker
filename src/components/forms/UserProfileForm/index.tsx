import { useDialogStore, useUserStore } from '@/store';
import FormLayout from '../FormLayout';
import UserProfileFormHeader from './Header';
import UserProfileFormFooter from './Footer';
import UserProfileFormContent from './Content';
import { useForm } from 'react-hook-form';
import { UserProfileFormValues } from '@/types';
import { updateUser } from '@/firebase/auth';
import { type User } from 'firebase/auth';

export default function UserProfileForm() {
  const toggleUserProfileDialog = useDialogStore((state) => state.toggleUserProfileDialog);
  const user = useUserStore((state) => state.user);
  const { displayName, email, phoneNumber, photoURL } = user || {};
  const { control, handleSubmit } = useForm<UserProfileFormValues>({
    defaultValues: { displayName, email, phoneNumber, photoURL },
  });

  async function onSubmit({ displayName, email, photoURL }: UserProfileFormValues) {
    await updateUser({ displayName, email, photoURL } as User);
    toggleUserProfileDialog(false);
  }
  return (
    <FormLayout
      Header={UserProfileFormHeader}
      Footer={UserProfileFormFooter}
      Content={() => <UserProfileFormContent control={control} />}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
