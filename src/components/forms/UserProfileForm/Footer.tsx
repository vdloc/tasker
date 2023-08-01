import Button from '@/components/common/Button';
import { signOutUser } from '@/firebase/auth';
import { useDialogStore, useTaskStore } from '@/store';
import { redirect } from 'react-router-dom';

export default function UserProfileFormFooter() {
  const { toggleUserProfileDialog, resetDialogs } = useDialogStore();
  const { toggleShowCompletedTasks } = useTaskStore();

  function handleCloseDialog() {
    toggleUserProfileDialog(false);
  }

  async function handleSignOut() {
    resetDialogs();
    toggleShowCompletedTasks(false);
    await signOutUser();
    redirect('/sign-in');
  }

  return (
    <>
      <Button
        type='button'
        label='Cancel'
        onClick={handleCloseDialog}
        color='white'
      />
      <Button type='submit' label='Update' className='ml-4' />
      <Button
        type='button'
        label='Sign Out'
        className='ml-4'
        color='pink'
        onClick={handleSignOut}
      />
    </>
  );
}
