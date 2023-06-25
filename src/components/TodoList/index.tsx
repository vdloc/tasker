import Todo from '@components/Todo';
import TodoListHeader from './Header';
import { Tag, type TodoItem } from '@/types';
import { useStore } from '@/store';
import sampleTasks from '@data/todos.json';
import sampleTags from '@data/tags.json';
import Placeholder from './Placeholder';

type TodoListProps = {
  todos: TodoItem[];
  loading: boolean;
};

export default function TodoList({ todos = [], loading }: TodoListProps) {
  const isShowCompletedTasks = useStore((state) => state.isShowCompletedTasks);
  const createTasks = useStore((state) => state.createTasks);
  const addTags = useStore((state) => state.addTags);

  function handleCreateSampleTasks() {
    createTasks(sampleTasks as TodoItem[]);
    addTags(sampleTags as Tag[]);
  }

  return (
    <fieldset>
      <TodoListHeader />
      <div className="divide-y divide-gray-200 border-t border-gray-200 text-left px-4 h-[35rem] overflow-y-auto">
        {loading ? (
          <Placeholder.TasksSkeleton />
        ) : todos.length ? (
          todos.map((todo) => <Todo todo={todo} key={todo.id} />)
        ) : (
          <p className="font-medium italic mt-8">
            {isShowCompletedTasks ? (
              <Placeholder.CompletedTasks />
            ) : (
              <Placeholder.DoingTasks handleCreateSampleTasks={handleCreateSampleTasks} />
            )}
          </p>
        )}
      </div>
    </fieldset>
  );
}
