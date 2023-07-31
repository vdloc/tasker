import { handleAuthStateChange } from '@/firebase/auth';
import { database } from '@/firebase/firestore';
import { useUserStore } from '@/store';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/sign-in');
  }, []);
  return null;
}

export default function Auth({ children }: PropsWithChildren) {
  const { user, setUser } = useUserStore();
  async function onAuthChange(user: any) {
    setUser(user);
    database.setCurrentUser(user);
  }
  useEffect(() => {
    handleAuthStateChange(onAuthChange);
  }, []);

  return user ? <>{children}</> : <Redirect />;
}
