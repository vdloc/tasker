import { updateUser } from '@/firebase/auth';
import { useDialogStore, useSettingsStore } from '@/store';
import { SettingsFormValues } from '@/types';
import { getFirestoreErrorMessage } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { type User } from 'firebase/auth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import FormLayout from '../FormLayout';
import SettingsFormContent from './Content';
import SettingsFormFooter from './Footer';
import SettingsFormHeader from './Header';

export default function SettingsForm() {
  const { toggleUserProfileDialog } = useDialogStore();
  const { user, darkMode, setDarkMode } = useSettingsStore();
  const { displayName, email, phoneNumber, photoURL } = user || {};
  const { control, handleSubmit, watch } = useForm<SettingsFormValues>({
    defaultValues: { displayName, email, phoneNumber, photoURL, darkMode },
  });
  const watchDarkMode = watch('darkMode');

  useEffect(() => {
    setDarkMode(watchDarkMode);
  }, [watchDarkMode, setDarkMode]);

  async function onSubmit({ displayName, email, photoURL }: SettingsFormValues) {
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
      Header={SettingsFormHeader}
      Footer={SettingsFormFooter}
      Content={() => <SettingsFormContent control={control} />}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
