import { TodoItem } from '@/types';

export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function filterTasksByStatus(tasks: TodoItem[]) {
  const completedTask: TodoItem[] = [];
  const uncompletedTask: TodoItem[] = [];

  tasks.forEach((task) => {
    task.status ? completedTask.push(task) : uncompletedTask.push(task);
  });

  return [completedTask, uncompletedTask];
}
