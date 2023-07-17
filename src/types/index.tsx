import { FunctionComponent, ReactNode } from 'react';
import type { Control } from 'react-hook-form';

export type Task = {
  userID?: string;
  id: string | number;
  title: string;
  description: string;
  status: boolean;
  tags?: Tag[];
  createDate?: string;
  dueDate?: string;
};

export type TagColor = 'indigo' | 'red' | 'lime' | 'sky' | 'zinc' | 'orange';

export type Tag = {
  userID?: string;
  id: number | string;
  name: string;
  color: TagColor;
};

export type User = {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
};

export interface TaskState {
  selectingTask: Task;
  uncompletedTasks: Task[];
  completedTasks: Task[];
  isShowCompletedTasks: boolean;
  setSelectingTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  fetchTasks: () => void;
  deleteTask: (task: Task) => void;
  createTask: (task: Task) => void;
  createTasks: (tasks: Task[]) => void;
  toggleShowCompletedTasks: (isShow: boolean) => void;
}

export interface DialogState {
  isTaskUpdateDialogOpen: boolean;
  isTaskCreateDialogOpen: boolean;
  isTagsListEditDialogOpen: boolean;
  isUserProfileOpen: boolean;
  toggleTaskUpdateDialog: (isOpen: boolean) => void;
  toggleTaskCreateDialog: (isOpen: boolean) => void;
  toggleTagsListEditDialog: (isOpen: boolean) => void;
  toggleUserProfileDialog: (isOpen: boolean) => void;
}

export interface NotificationProps {
  icon: FunctionComponent | null;
  title: string;
  description: string;
}

export interface NotificationState {
  isNotificationOpen: boolean;
  toggleNotification: (isOpen: boolean) => void;
  notificationProps: NotificationProps;
  setNotification: (props: NotificationProps) => void;
}

export interface TagState {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  deleteTag: (tag: Tag) => void;
  addTags: (tags: Tag[]) => void;
  setTags: (tags: Tag[]) => void;
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface StoreState
  extends TaskState,
    DialogState,
    TagState,
    UserState,
    NotificationState {}

export type TaskCreateFormValues = {
  title: string;
  description: string;
  id: string | number;
  createDate: string;
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

export type UserSignInFormValues = {
  email: string;
  password: string;
};

export type UserSignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserProfileFormValues = User;

export type FormInputProps = {
  control: Control<any>;
  rules?: object;
  name: any;
  label: string;
  id?: string;
  className?: string;
  type?: string;
};

export const enum StorePersistKey {
  Tag = 'tasker-tag',
  Task = 'tasker-task',
  Dialog = 'tasker-dialog',
  User = 'tasker-user',
  Notification = 'tasker-notification',
}
