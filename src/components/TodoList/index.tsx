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
      <div className='divide-y divide-gray-200 border-t border-gray-200 text-left px-4 h-[calc(100vh-12rem)] md:h-[35rem] overflow-y-auto'>
        {todos.length ? (
          todos.map((todo) => <Todo todo={todo} key={todo.id} />)
        ) : (
          <p className='font-medium italic mt-8'>
            {isShowCompletedTasks ? (
              <span>
                No tasks has been completed! <br /> Do your tasks!
              </span>
            ) : (
              'Great job! Create some tasks?'
            )}
          </p>
        )}
      </div>
    </fieldset>
  );
}
