import { Task } from '@/types';

export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function filterTasksByStatus(tasks: Task[]) {
  const completedTask: Task[] = [];
  const uncompletedTask: Task[] = [];

  tasks.forEach((task) => {
    task.status ? completedTask.push(task) : uncompletedTask.push(task);
  });

  return [completedTask, uncompletedTask];
}
