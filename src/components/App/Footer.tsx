import { useDialogStore, useTaskStore } from '@/store';

import Button from '../common/Button';

const CardFooter = function AppFooter() {
  const { toggleTagsListEditDialog, toggleUserProfileDialog, isTagsListEditDialogOpen, isUserProfileOpen } =
    useDialogStore();
  const { isShowCompletedTasks, toggleShowCompletedTasks } = useTaskStore();

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
    <div className="h-16 md:h-20 grid items-center">
      <div className="flex gap-4 justify-end">
        <Button label="Profile" size="large" onClick={handleUserProfileButtonClick} />
        <Button label="Tags" size="large" onClick={handleEditTagsButtonClick} />
        <Button
          label={isShowCompletedTasks ? 'Doing Tasks' : 'Completed Tasks'}
          size="large"
          onClick={handleCompletedTasksButtonClick}
        />
      </div>
    </div>
  );
};

export default CardFooter;
