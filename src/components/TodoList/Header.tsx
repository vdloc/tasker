export default function TodoListHeader() {
  return (
    <legend className='font-medium text-gray-900 grid grid-cols-12 justify-center w-full p-4'>
      <span className='text-lg col-span-8'>Tasks</span>
      <span className='text-md col-span-2 text-right'>Status</span>
      <span className='text-md col-span-2 text-right'>Action</span>
    </legend>
  );
}
