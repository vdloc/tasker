import Button from '@/components/common/Button';
import { useDialogStore, useTagStore } from '@/store';
import { getFirestoreErrorMessage } from '@/utils';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

export default function TagsListEditFormFooter() {
  const { toggleTagsListEditDialog } = useDialogStore();
  const { resetTags } = useTagStore();

  function handleCloseDialog() {
    toggleTagsListEditDialog(false);
  }

  async function handleRemoveAllTag() {
    try {
      await resetTags();
      toast.success('All tags has been deleted.');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorMessage = getFirestoreErrorMessage(firebaseError.code);
      toast.error(errorMessage);
    }
  }

  return (
    <>
      <Button label="Delete all" color="pink" onClick={handleRemoveAllTag} />
      <Button label="Close" color="white" className='ml-3' onClick={handleCloseDialog} />
    </>
  );
}
