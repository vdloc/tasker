const dialogReducer = (set: any, get: any) => ({
  isTaskUpdateDialogOpen: false,
  isTaskCreateDialogOpen: false,
  isTagsListEditDialogOpen: false,
  isUserProfileOpen: false,
  toggleTaskUpdateDialog: (isOpen = false) =>
    set({
      isTaskUpdateDialogOpen: isOpen,
      selectingTask: isOpen ? get().selectingTask : {},
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
  resetDialogs() {
    set({
      isTaskUpdateDialogOpen: false,
      isTaskCreateDialogOpen: false,
      isTagsListEditDialogOpen: false,
      isUserProfileOpen: false,
    });
  },
});

export default dialogReducer;
