import type { Control } from 'react-hook-form';

export type TodoItem = {
  id: string | number;
  title: string;
  description: string;
  status: boolean;
  tags?: Tag[];
  createDate?: string;
  dueDate?: string;
  endDate?: string;
};

export type TagColor = 'indigo' | 'red' | 'lime' | 'sky' | 'zinc' | 'orange';

export type Tag = {
  id: number | string;
  name: string;
  color: TagColor;
};

interface TaskState {
  selectingTask: TodoItem;
  uncompletedTasks: TodoItem[];
  completedTasks: TodoItem[];
  isShowCompletedTasks: boolean;
  setSelectingTask: (task: TodoItem) => void;
  updateTask: (task: TodoItem) => void;
  fetchTasks: () => void;
  deleteTask: (task: TodoItem) => void;
  createTask: (task: TodoItem) => void;
  toggleShowCompletedTasks: (isShow: boolean) => void;
}

interface DialogState {
  isTaskUpdateDialogOpen: boolean;
  isTaskCreateDialogOpen: boolean;
  isTagsListEditDialogOpen: boolean;
  toggleTaskUpdateDialog: (isOpen: boolean) => void;
  toggleTaskCreateDialog: (isOpen: boolean) => void;
  toggleTagsListEditDialog: (isOpen: boolean) => void;
}

interface TagState {
  tags: Tag[];
  fetchTags: () => void;
  addTag: (tag: Tag) => void;
  deleteTag: (tag: Tag) => void;
}

export interface StoreState extends TaskState, DialogState, TagState {}

export type TaskCreateFormValues = {
  title: string;
  description: string;
  id: string | number;
  startDate: string;
  dueDate: string;
  tags?: Tag[];
};

export type TaskEditFormValues = {
  status: boolean;
} & TaskCreateFormValues;

export type TagsListEditFormValues = {
  id: string | number;
  name: string;
  color: TagColor;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormInputProps = {
  control: Control<any>;
  rules?: object;
  name: any;
  label: string;
  id?: string;
  className?: string;
  type?: string;
};
