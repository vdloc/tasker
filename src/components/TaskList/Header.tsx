import { useTaskStore } from '@/store';

export default function TaskListHeader() {
  const { isShowCompletedTasks } = useTaskStore();

  return (
    <legend className="font-medium text-gray-900 dark:text-gray-100 grid grid-cols-12 justify-center w-full px-4 h-12 items-center">
      <span className="text-lg col-span-8">{isShowCompletedTasks ? 'Completed Tasks' : 'Doing Tasks'}</span>
      <span className="text-md col-span-2 text-right">Status</span>
      <span className="text-md col-span-2 text-right">Action</span>
    </legend>
  );
}
