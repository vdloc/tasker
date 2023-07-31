import { User } from '@/types';

const userReducer = (set: any) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
});

export default userReducer;
