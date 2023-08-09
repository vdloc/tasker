import Todo from '@/components/Task';
import { useSettingsStore, useTagStore, useTaskStore } from '@/store';
import { Tag, Task } from '@/types';
import { sortTasksByPriorityAndStartTime } from '@/utils';
import sampleTags from '@data/tags.json';
import sampleTasks from '@data/tasks.json';
import { useMemo } from 'react';

import TaskListHeader from './Header';
import Placeholder from './Placeholder';

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
};

export default function TaskList({ tasks = [], loading }: TaskListProps) {
  const { user } = useSettingsStore();
  const { addTags } = useTagStore();
  const { isShowCompletedTasks, createTasks } = useTaskStore();
  const sortedTasks = useMemo(() => sortTasksByPriorityAndStartTime(tasks), [tasks]);

  async function handleCreateSampleTasks() {
    const tasks = sampleTasks.map((item) => ({ ...item, userID: user?.uid }));
    const tags = sampleTags.map((item) => ({ ...item, userID: user?.uid }));

    addTags(tags as Tag[]);
    createTasks(tasks as Task[]);
  }

  return (
    <fieldset>
      <TaskListHeader />
      <div className="divide-y divide-gray-200 border-t border-gray-200 text-left px-4 h-[35rem] overflow-y-auto">
        {loading ? (
          <Placeholder.TasksSkeleton />
        ) : sortedTasks.length ? (
          sortedTasks.map((task) => <Todo task={task} key={task.id} />)
        ) : (
          <div className="font-medium italic mt-8 leading-normal">
            {isShowCompletedTasks ? (
              <Placeholder.CompletedTasks />
            ) : (
              <Placeholder.DoingTasks handleCreateSampleTasks={handleCreateSampleTasks} />
            )}
          </div>
        )}
      </div>
    </fieldset>
  );
}
