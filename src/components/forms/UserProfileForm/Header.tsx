import { useStore } from '@/store';
import FormHeader from '../components/FormHeader';

export default function UserProfileFormHeader() {
  const toggleUserProfileDialog = useStore((state) => state.toggleUserProfileDialog);
  return <FormHeader title="Profile" description="User information." onClose={toggleUserProfileDialog} />;
}
