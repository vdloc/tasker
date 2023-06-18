import { handleAuthStateChange } from '@/firebase';
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
  function onAuthChange(user: any) {
    setUser(user);
  }
  useEffect(() => {
    handleAuthStateChange(onAuthChange);
  }, []);

  return user ? <>{children}</> : <Redirect />;
}
