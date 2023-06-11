import { useStore } from '@/store';
import Button from '../Button';

export type CardHeaderProp = {
  title: string;
  description: string;
};

export default function CardHeader({ title, description }: CardHeaderProp) {
  const isTaskCreateDialogOpen = useStore(
    (state) => state.isTaskCreateDialogOpen
  );
  const toggleTaskCreateDialog = useStore(
    (state) => state.toggleTaskCreateDialog
  );

  function handleCreateTaskButtonClick() {
    toggleTaskCreateDialog(!isTaskCreateDialogOpen);
  }

  return (
    <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
      <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
        <div className='ml-4 mt-4'>
          <h3 className='text-2xl font-medium leading-6 text-gray-900 text-left'>
            {title}
          </h3>
          <p className='mt-2 text-base text-gray-500'>{description}</p>
        </div>
        <div className='ml-4 mt-4 flex-shrink-0'>
          <Button
            type='button'
            label='Create'
            onClick={handleCreateTaskButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
