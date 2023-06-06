import type { Control } from 'react-hook-form';

export type TodoItem = {
  id: string | number;
  title: string;
  description: string;
  status: boolean;
  tags?: string[];
  createDate?: string;
  dueDate?: string;
  endDate?: string;
};

export interface StoreState {
  isTaskUpdateDialogOpen: boolean;
  isTaskCreateDialogOpen: boolean;
  isShowCompletedTasks: boolean;
  selectingTask: TodoItem | null;
  uncompletedTasks: TodoItem[];
  completedTasks: TodoItem[];
  setSelectingTask: (task: TodoItem | null) => void;
  toggleTaskUpdateDialog: (isOpen: boolean) => void;
  toggleTaskCreateDialog: (isOpen: boolean) => void;
  toggleShowCompletedTasks: (isShow: boolean) => void;
  updateTask: (task: TodoItem) => void;
  fetchTasks: () => void;
  deleteTask: (task: TodoItem | null) => void;
  createTask: (task: TodoItem) => void;
}

export type TaskEditFormValues = {
  title: string;
  description: string;
  status: boolean;
  id: string | number;
};

export type InputProps = {
  control: Control<TaskEditFormValues>;
  name: any;
  label: string;
  id?: string;
};
