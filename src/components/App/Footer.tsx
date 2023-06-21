import Button from '../common/Button';
import { useStore } from '@/store';
import { shallow } from 'zustand/shallow';

const CardFooter = function AppFooter() {
  const [
    toggleShowCompletedTasks,
    toggleTagsListEditDialog,
    toggleUserProfileDialog,
    isShowCompletedTasks,
    isTagsListEditDialogOpen,
    isUserProfileOpen,
  ] = useStore(
    (state) => [
      state.toggleShowCompletedTasks,
      state.toggleTagsListEditDialog,
      state.toggleUserProfileDialog,
      state.isShowCompletedTasks,
      state.isTagsListEditDialogOpen,
      state.isUserProfileOpen,
    ],
    shallow
  );

  function handleEditTagsButtonClick() {
    toggleTagsListEditDialog(!isTagsListEditDialogOpen);
  }

  function handleCompletedTasksButtonClick() {
    toggleShowCompletedTasks(!isShowCompletedTasks);
  }

  function handleUserProfileButtonClick() {
    toggleUserProfileDialog(!isUserProfileOpen);
  }

  return (
    <div className='h-16 md:h-20 grid items-center'>
      <div className='flex gap-4 justify-end'>
        <Button
          label='Profile'
          size='large'
          onClick={handleUserProfileButtonClick}
        />
        <Button label='Tags' size='large' onClick={handleEditTagsButtonClick} />
        <Button
          label={isShowCompletedTasks ? 'Doing Tasks' : 'Completed Tasks'}
          size='large'
          onClick={handleCompletedTasksButtonClick}
        />
      </div>
    </div>
  );
};

export default CardFooter;
