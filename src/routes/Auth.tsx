import { handleAuthStateChange } from '@/firebase';
import { useStore } from '@/store';
import { type User } from 'firebase/auth';
import { PropsWithChildren, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

function Redirect() {
  useEffect(() => {
    redirect('/sign-in');
  }, []);
  return null;
}

export default function Auth({ children }: PropsWithChildren) {
  const [user, setUser] = useStore((state) => [state.user, state.setUser], shallow);
  function onAuthChange(user: User | null) {
		console.log("​onAuthChange -> user", user)
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }
  useEffect(() => {
    handleAuthStateChange(onAuthChange);
  }, []);

  return user ? <>{children}</> : <Redirect />;
}
