import UserSignInForm from '@/components/forms/UserSignInForm';
import { useUserStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return <UserSignInForm />;
}
