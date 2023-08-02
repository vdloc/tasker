import { updateUser } from '@/firebase/auth';
import { useDialogStore, useUserStore } from '@/store';
import { UserProfileFormValues } from '@/types';
import { getFirestoreErrorMessage } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { type User } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import FormLayout from '../FormLayout';
import UserProfileFormContent from './Content';
import UserProfileFormFooter from './Footer';
import UserProfileFormHeader from './Header';

export default function UserProfileForm() {
  const { toggleUserProfileDialog } = useDialogStore();
  const { user } = useUserStore();
  const { displayName, email, phoneNumber, photoURL } = user || {};
  const { control, handleSubmit } = useForm<UserProfileFormValues>({
    defaultValues: { displayName, email, phoneNumber, photoURL },
  });

  async function onSubmit({ displayName, email, photoURL }: UserProfileFormValues) {
    try {
      await updateUser({ displayName, email, photoURL } as User);
      toast.success('Your profile has been updated!');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorMessage = getFirestoreErrorMessage(firebaseError.code);
      toast.error(errorMessage);
    } finally {
      toggleUserProfileDialog(false);
    }
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
