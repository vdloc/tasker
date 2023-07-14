import Button from '@/components/common/Button';
import { signOutUser } from '@/firebase/auth';
import { useDialogStore } from '@/store';
import { redirect } from 'react-router-dom';

export default function UserProfileFormFooter() {
  const toggleUserProfileDialog = useDialogStore((state) => state.toggleUserProfileDialog);

  function handleCloseDialog() {
    toggleUserProfileDialog(false);
  }

  async function handleSignOut() {
    await signOutUser();
    redirect('/sign-in');
    toggleUserProfileDialog(false);
  }

  return (
    <>
      <Button type="button" label="Cancel" onClick={handleCloseDialog} color="white" />
      <Button type="submit" label="Update" className="ml-4" />
      <Button type="button" label="Sign Out" className="ml-4" color="pink" onClick={handleSignOut} />
    </>
  );
}
