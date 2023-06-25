import { handleAuthStateChange } from '@/firebase';
import { database } from '@/firebase/firestore';
import { useStore } from '@/store';
// import { User } from '@/types';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/sign-in');
  }, []);
  return null;
}

export default function Auth({ children }: PropsWithChildren) {
  const [user, setUser] = useStore((state) => [state.user, state.setUser], shallow);
  async function onAuthChange(user: any) {
    setUser(user);
    if (user) {
      const userInDB = await database.getUser(user.uid);
      if (!userInDB) {
        await database.createUser(user.uid);
      }
    }
  }
  useEffect(() => {
    handleAuthStateChange(onAuthChange);
  }, []);

  return user ? <>{children}</> : <Redirect />;
}
