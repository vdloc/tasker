import todos from '../data/todos.json';
import TodoItem from './TodoItem';

export default function TodoList() {
  return (
    <fieldset>
      <legend className='font-medium text-gray-900 grid grid-cols-12 justify-center w-full'>
        <span className='text-lg col-span-8'>Tasks</span>
        <span className='text-md col-span-2 text-right'>Status</span>
        <span className='text-md col-span-2 text-right'>Action</span>
      </legend>
      <div className='mt-4 divide-y divide-gray-200 border-t border-b border-gray-200 text-left'>
        {todos.map((todo) => (
          <TodoItem {...todo} key={todo.id} />
        ))}
      </div>
    </fieldset>
  );
}
