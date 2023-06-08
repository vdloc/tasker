import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type FormHeaderProps = {
  onClose: (isOpen: boolean) => void;
  title: string;
  description: string;
};

export default function FormHeader({
  onClose,
  title,
  description,
}: FormHeaderProps) {
  return (
    <div className='bg-indigo-700 py-6 px-4 sm:px-6'>
      <div className='flex items-center justify-between'>
        <Dialog.Title className='text-lg font-medium text-white'>
          {title}
        </Dialog.Title>
        <div className='ml-3 flex h-7 items-center'>
          <button
            type='button'
            className='rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
            onClick={() => onClose(false)}
          >
            <span className='sr-only'>Close panel</span>
            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      </div>
      <div className='mt-1'>
        <p className='text-sm text-indigo-300'>{description}</p>
      </div>
    </div>
  );
}
