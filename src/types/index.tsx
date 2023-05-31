export type TodoItem = {
  id: string | number;
  title: string;
  description: string;
  status: boolean;
  tags?: string[];
  createTime?: string;
  dueTime?: string;
  finishTime?: string;
};

export interface StoreState {
  isTaskUpdatePopupOpen: boolean,
  isTaskCreatePopupOpen: boolean,
  selectingTask: TodoItem | null,
  tasks: TodoItem[] | [],
  setSelectingTask: (task: TodoItem) => void,
  toggleTaskUpdatePopup: (isOpen: boolean) => void,
  toggleTaskCreatePopup: (isOpen: boolean) => void
}

export type TaskEditFormValues = {
  title: string;
  description: string;
  status: boolean;
};