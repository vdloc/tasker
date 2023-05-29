import { JSX } from 'react';

type CardProps = {
  children: JSX.Element;
  title: string;
  description: string;
};

export default function Card({ children, title, description }: CardProps) {
  return (
    <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg min-w-[30rem]'>
      <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
        <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-4 mt-4'>
            <h3 className='text-2xl font-medium leading-6 text-gray-900 text-left'>
              {title}
            </h3>
            <p className='mt-2 text-sm text-gray-500'>{description}</p>
          </div>
          <div className='ml-4 mt-4 flex-shrink-0'>
            <button
              type='button'
              className='relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className='px-4 py-5 sm:p-6'>{children}</div>
      <div className='px-4 py-4 sm:px-6'>
        {/* Content goes here */}
        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
      </div>
    </div>
  );
}
