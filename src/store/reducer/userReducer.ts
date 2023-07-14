import { User } from '@/types';

const userReducer = (set: any) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  isUserProfileOpen: false,
  toggleUserProfileDialog: (isShow: boolean) => set({ isUserProfileOpen: isShow }),
});

export default userReducer;
