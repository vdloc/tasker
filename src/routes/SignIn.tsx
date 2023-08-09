import UserSignInForm from '@/components/forms/UserSignInForm';
import { useSettingsStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { user } = useSettingsStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return <UserSignInForm />;
}
