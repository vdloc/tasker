import Button from '@/components/common/Button';
import { signOutUser } from '@/firebase/auth';
import { useDialogStore, useTaskStore } from '@/store';
import { getFirestoreErrorMessage } from '@/utils';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';

export default function UserProfileFormFooter() {
  const { toggleUserProfileDialog, resetDialogs } = useDialogStore();
  const { toggleShowCompletedTasks } = useTaskStore();

  function handleCloseDialog() {
    toggleUserProfileDialog(false);
  }

  async function handleSignOut() {
    try {
      await signOutUser();
      resetDialogs();
      toggleShowCompletedTasks(false);
      redirect('/sign-in');
      toast.success('You have been successfully logged out.');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorMessage = getFirestoreErrorMessage(firebaseError.code);
      toast.error(errorMessage);
    }
  }

  return (
    <>
      <Button type="button" label="Cancel" onClick={handleCloseDialog} color="white" />
      <Button type="submit" label="Update" className="ml-4" />
      <Button type="button" label="Sign Out" className="ml-4" color="pink" onClick={handleSignOut} />
    </>
  );
}
