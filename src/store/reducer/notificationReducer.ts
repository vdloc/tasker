import { NotificationProps, StoreState } from '@/types';

const notificationReducer = (set: any) => ({
  isNotificationOpen: false,
  notificationProps: {
    icon: null,
    title: '',
    description: '',
  },
  toggleNotification: (isOpen = false) => set({ isNotificationOpen: isOpen }),
  setNotification: (props: NotificationProps) => {
    set((state: StoreState) => ({
      notificationProps: { ...state.notificationProps, ...props },
    }));
  },
});

export default notificationReducer;
