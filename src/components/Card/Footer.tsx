import Button from '../Button';
import { useStore } from '@/store';
import { shallow } from 'zustand/shallow';

const CardFooter = function CardFooter() {
  const [toggleShowCompletedTasks, isShowCompletedTasks] = useStore(
    (state) => [state.toggleShowCompletedTasks, state.isShowCompletedTasks],
    shallow
  );

  function handleCompletedTasksButtonClick() {
    toggleShowCompletedTasks(!isShowCompletedTasks);
  }
  return (
    <div className='px-4 py-4 sm:px-6'>
      <div className='flex gap-4 justify-end'>
        <Button label='Edit Tags' size='large' rounded={true} />
        <Button
          label={isShowCompletedTasks ? 'Doing Tasks' : 'Completed Tasks'}
          size='large'
          rounded={true}
          onClick={handleCompletedTasksButtonClick}
        />
      </div>
    </div>
  );
};

export default CardFooter;
