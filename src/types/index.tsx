import type { Control } from "react-hook-form";

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
  isTaskUpdatePopupOpen: boolean;
  isTaskCreatePopupOpen: boolean;
  selectingTask: TodoItem | null;
  tasks: TodoItem[] | [];
  setSelectingTask: (task: TodoItem) => void;
  toggleTaskUpdatePopup: (isOpen: boolean) => void;
  toggleTaskCreatePopup: (isOpen: boolean) => void;
  updateTask: (task: TodoItem) => void;
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
