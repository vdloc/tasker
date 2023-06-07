import { PlusIcon } from '@heroicons/react/24/outline';

export default function Tags() {
  return (
    <div>
      <h3 className='text-sm font-medium text-gray-900'>Tags</h3>
      <div className='mt-2'>
        <div className='flex space-x-2'>
          <button
            type='button'
            title='Add tag'
            className='inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <span className='sr-only'>Add tag</span>
            <PlusIcon className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>
      </div>
    </div>
  );
}
