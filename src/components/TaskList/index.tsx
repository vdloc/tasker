import Todo from '@/components/Task';
import { database } from '@/firebase/firestore';
import { useTagStore, useTaskStore, useUserStore } from '@/store';
import { Tag, type Task } from '@/types';
import sampleTags from '@data/tags.json';
import sampleTasks from '@data/todos.json';
import { shallow } from 'zustand/shallow';

import TaskListHeader from './Header';
import Placeholder from './Placeholder';

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
};

export default function TaskList({ tasks = [], loading }: TaskListProps) {
  const user = useUserStore((state) => state.user);
  const setTags = useTagStore((state) => state.setTags);
  const { isShowCompletedTasks, createTasks } = useTaskStore((state) => state, shallow);

  async function handleCreateSampleTasks() {
    const tasks = sampleTasks.map((item) => ({ ...item, userID: user?.uid }));
    const tags = sampleTags.map((item) => ({ ...item, userID: user?.uid }));
    const updatedTags = await database.createTags(tags as Tag[]);
    tasks.forEach((task) => {
      const { tags } = task;

      tags.forEach((tag) => {
        const updatedTag = updatedTags.find((updatedTag) => updatedTag.name === tag.name);

        if (updatedTag) {
          tag.id = updatedTag.id as number;
        }
      });
    });

    setTags(updatedTags);
    createTasks(tasks as Task[]);
  }

  return (
    <fieldset>
      <TaskListHeader />
      <div className="divide-y divide-gray-200 border-t border-gray-200 text-left px-4 h-[35rem] overflow-y-auto">
        {loading ? (
          <Placeholder.TasksSkeleton />
        ) : tasks.length ? (
          tasks.map((task) => <Todo task={task} key={task.id} />)
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
