import todos from '@data/todos.json';
import TodoItem from '@components/TodoItem';
import TodoListHeader from './Header';

export default function TodoList() {
  return (
    <fieldset>
      <TodoListHeader />
      <div className='mt-4 divide-y divide-gray-200 border-t border-b border-gray-200 text-left'>
        {todos.map((todo) => (
          <TodoItem {...todo} key={todo.id} />
        ))}
      </div>
    </fieldset>
  );
}
