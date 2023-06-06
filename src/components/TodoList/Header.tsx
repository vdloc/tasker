import { useStore } from '@/store';

export default function TodoListHeader() {
  const isShowCompletedTasks = useStore((state) => state.isShowCompletedTasks);
  return (
    <legend className='font-medium text-gray-900 grid grid-cols-12 justify-center w-full p-4'>
      <span className='text-lg col-span-8'>
        {isShowCompletedTasks ? 'Completed Tasks' : 'Doing Tasks'}
      </span>
      <span className='text-md col-span-2 text-right'>Status</span>
      <span className='text-md col-span-2 text-right'>Action</span>
    </legend>
  );
}
