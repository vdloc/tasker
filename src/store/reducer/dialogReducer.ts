import { set } from 'react-hook-form';

const dialogReducer = (set: any) => ({
  isTaskUpdateDialogOpen: false,
  isTaskCreateDialogOpen: false,
  isTagsListEditDialogOpen: false,
  isUserProfileOpen: false,
  toggleTaskUpdateDialog: (isOpen = false) =>
    set({
      isTaskUpdateDialogOpen: isOpen,
    }),
  toggleTaskCreateDialog: (isOpen = false) =>
    set({
      isTaskCreateDialogOpen: isOpen,
    }),
  toggleTagsListEditDialog: (isOpen = false) =>
    set({
      isTagsListEditDialogOpen: isOpen,
    }),
  toggleUserProfileDialog: (isOpen = false) => set({ isUserProfileOpen: isOpen }),
});

export default dialogReducer;
