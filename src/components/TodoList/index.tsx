import Todo from '@components/Todo';
import TodoListHeader from './Header';
import { type TodoItem } from '@/types';
import { useStore } from '@/store';

type TodoListProps = {
  todos: TodoItem[];
};

export default function TodoList({ todos = [] }: TodoListProps) {
  const isShowCompletedTasks = useStore((state) => state.isShowCompletedTasks);
  return (
    <fieldset>
      <TodoListHeader />
      {todos.length ? (
        <div className='divide-y divide-gray-200 border-t border-gray-200 text-left px-4 max-h-[35rem] overflow-y-scroll'>
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </div>
      ) : (
        <p className='p-4'>
          {isShowCompletedTasks
            ? 'Do your tasks dude!'
            : 'Great job! Create some tasks?'}
        </p>
      )}
    </fieldset>
  );
}
