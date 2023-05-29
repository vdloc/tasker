import todos from '../data/todos.json';

export default function TodoList() {
  return (
    <fieldset>
      <legend className='font-medium text-gray-900 flex justify-between w-full'>
        <span className='text-lg'>Tasks</span>
        <span className='text-md'>Done?</span>
      </legend>
      <div className='mt-4 divide-y divide-gray-200 border-t border-b border-gray-200 text-left'>
        {todos.map((todo, todoIndex) => (
          <div key={todoIndex} className='relative flex items-center justify-between py-4'>
            <div className='min-w-0 max-w-xs'>
              <label
                htmlFor={`todo-${todo.id}`}
                className='select-none font-medium text-md text-gray-700 cursor-pointer'
              >
                {todo.title}
              </label>
              <p className='text-xs text-black mt-1'>{todo.description}</p>
            </div>
            <div className='ml-3 flex h-5 items-center'>
              <input
                id={`todo-${todo.id}`}
                name={`todo-${todo.id}`}
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer'
              />
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
