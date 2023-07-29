import { classNames } from '@/utils';

import Button from '../common/Button';

type DoingTasksPlaceholderProps = {
  handleCreateSampleTasks: () => void;
};

function CompletedTasksPlaceholder() {
  return (
    <span>
      No tasks has been completed! <br /> Do your tasks!
    </span>
  );
}

function DoingTasksPlaceholder({ handleCreateSampleTasks }: DoingTasksPlaceholderProps) {
  return (
    <>
      <span className="text-sm block">
        There aren&apos;t any tasks created yet! Create your owns or load some sample tasks?
      </span>
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
