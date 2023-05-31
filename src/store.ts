import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, TodoItem } from './types';

export const useStore = create<StoreState, [['zustand/immer', never]]>(
  immer((set) => ({
    tasks: [],
    selectingTask: null,
    isTaskUpdatePopupOpen: false,
    isTaskCreatePopupOpen: false,
    toggleTaskUpdatePopup: (isOpen = false) =>
      set(() => ({
        isTaskUpdatePopupOpen: isOpen,
      })),
    toggleTaskCreatePopup: (isOpen = false) =>
      set(() => ({
        isTaskCreatePopupOpen: isOpen,
      })),
    setSelectingTask: (task: TodoItem) => set(() => ({ selectingTask: task })),
    updateTask: (updatedTask: TodoItem) =>
      set((state: StoreState) => {
        const updatingTaskIndex = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        state.tasks = [
          ...state.tasks.slice(0, updatingTaskIndex),
          updatedTask,
          ...state.tasks.slice(updatingTaskIndex + 1),
        ];
      }),
  }))
);
