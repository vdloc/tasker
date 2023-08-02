import { classNames } from '@/utils';

import Button from '../common/Button';

type DoingTasksPlaceholderProps = {
  handleCreateSampleTasks: () => void;
};

function CompletedTasksPlaceholder() {
  return (
    <p className="text-sm">
      No tasks has been completed! <br /> Do your tasks!
    </p>
  );
}

function DoingTasksPlaceholder({ handleCreateSampleTasks }: DoingTasksPlaceholderProps) {
  return (
    <>
      <p className="text-sm">
        There are no tasks created yet! You can create your own or load some AI-generated samples.
      </p>
      <Button label="Load sample tasks" size="small" onClick={handleCreateSampleTasks} className="mt-4" />
    </>
  );
}

function TasksSkeleton() {
  return (
    <div className={classNames('py-4 space-y-4')}>
      <div className="animate-pulse flex">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Placeholder() {
  return;
}

Placeholder.DoingTasks = DoingTasksPlaceholder;
Placeholder.CompletedTasks = CompletedTasksPlaceholder;
Placeholder.TasksSkeleton = TasksSkeleton;
