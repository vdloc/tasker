import { type Unsubscribe } from 'firebase/firestore';
import type { Control } from 'react-hook-form';

type AddPrefixToKeys<Prefix extends string, T extends Record<string, unknown>> = {
  [K in keyof T & string as `${Prefix}.${K}`]+?: string extends K ? any : T[K];
};

export interface Task {
  userID?: string;
  id: string | number;
  title: string;
  description: string;
  status: boolean;
  tags?: Tag[];
  createDate?: string;
  dueDate?: string;
}

export interface FireStoreTask extends Task, AddPrefixToKeys<string, any> {}

export interface Tag {
  userID?: string;
  id: string;
  name: string;
  color: TagColor;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export type TagColor =
  | 'gray'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'orange'
  | 'blue'
  | 'purple'
  | 'lime'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'rose'
  | 'amber'
  | 'emerald'
  | 'fuchsia';

export interface TaskState {
  selectingTask: Task;
  uncompletedTasks: Task[];
  completedTasks: Task[];
  isShowCompletedTasks: boolean;
  setSelectingTask: (task: Task) => void;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  fetchTasks: () => Promise<void>;
  createTask: (task: Task) => Promise<void>;
  createTasks: (tasks: Task[]) => Promise<void>;
  toggleShowCompletedTasks: (isShow: boolean) => void;
  listenOnTasksChanged: () => Unsubscribe;
  resetTasks: () => void;
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
  resetDialogs: () => void;
}

export interface TagState {
  tags: Tag[];
  fetchTags: () => Promise<void>;
  addTag: (tag: Tag) => Promise<void>;
  deleteTag: (tag: Tag) => Promise<void>;
  addTags: (tags: Tag[]) => Promise<void>;
  listenOnTagsChanged: () => Unsubscribe;
  resetTags: () => Promise<void>;
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface StoreState extends TaskState, DialogState, TagState, UserState {}

export interface TaskCreateFormValues {
  title: string;
  description: string;
  id: string | number;
  createDate: string;
  dueDate: string;
  tags?: Tag[];
}

export interface TaskEditFormValues extends TaskCreateFormValues {
  status: boolean;
}

export interface TagsListEditFormValues {
  id: string | number;
  tagName: string;
  color: TagColor;
}

export interface UserSignInFormValues {
  email: string;
  password: string;
}

export interface UserSignUpFormValues extends UserSignInFormValues {
  confirmPassword: string;
}

export type UserProfileFormValues = User;

export interface FormInputProps {
  control: Control<any>;
  rules?: object;
  name: string;
  label: string;
  id?: string;
  className?: string;
  type?: string;
  placeholder?: string;
}

export const enum StorePersistKey {
  Tag = 'tasker-tag',
  Task = 'tasker-task',
  Dialog = 'tasker-dialog',
  User = 'tasker-user',
  App = 'tasker',
}

export interface Priority {
  id: number;
  title: string;
  current: boolean;
  color: string;
}
