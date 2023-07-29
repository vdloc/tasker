import { useDialogStore, useTaskStore } from '@/store';
import Button from './common/Button';
import type { Task } from '@/types';
import { ChangeEvent } from 'react';
import { shallow } from 'zustand/shallow';

type TodoProps = {
  todo: Task;
};

export default function Todo({ todo }: TodoProps) {
  const { id, title, description, status } = todo;
  const toggleTaskUpdateDialog = useDialogStore((state) => state.toggleTaskUpdateDialog);
  const { updateTask, setSelectingTask } = useTaskStore((state) => state, shallow);

  function handleTaskEditClick() {
    setSelectingTask(todo);
    toggleTaskUpdateDialog(true);
  }

  async function handleStatusChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const updatingTask = { ...todo, status: target.checked };

    updateTask(updatingTask);
  }

  return (
    <div className="relative grid grid-cols-12 items-center py-4">
      <div className="col-span-8">
        <label htmlFor={`todo-${id}`} className="select-none font-medium text-md text-gray-700 cursor-pointer">
          {title}
        </label>
        <p className="text-xs text-black mt-1">{description}</p>
      </div>
      <div className="col-span-2 text-right pr-3">
        <input
          id={`todo-${id}`}
          name={`todo-${id}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          onChange={handleStatusChange}
          checked={status}
        />
      </div>
      <div className="col-span-2 text-right">
        <Button label="Edit" size="small" onClick={handleTaskEditClick} />
      </div>
    </div>
  );
}
