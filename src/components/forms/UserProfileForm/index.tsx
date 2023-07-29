import { updateUser } from '@/firebase/auth';
import { useDialogStore, useUserStore } from '@/store';
import { UserProfileFormValues } from '@/types';
import { type User } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import FormLayout from '../FormLayout';
import UserProfileFormContent from './Content';
import UserProfileFormFooter from './Footer';
import UserProfileFormHeader from './Header';

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
