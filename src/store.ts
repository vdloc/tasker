import { create } from "zustand";
import type { StoreState, TodoItem } from "./types";

export const useStore = create<StoreState>((set) => ({
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
}));
