import todos from '@data/todos.json';
import TodoItem from '@components/TodoItem';
import TodoListHeader from './Header';

export default function TodoList() {
  return (
    <fieldset>
      <TodoListHeader />
      <div className='divide-y divide-gray-200 border-t border-gray-200 text-left px-4 max-h-[35rem] overflow-y-scroll'>
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </fieldset>
  );
}
