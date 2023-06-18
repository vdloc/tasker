import UserSignInForm from '@/components/forms/UserSignInForm';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return <UserSignInForm />;
}
