import { useDialogStore } from '@/store';

import FormHeader from '../components/FormHeader';

export default function UserProfileFormHeader() {
  const { toggleUserProfileDialog } = useDialogStore();
  return <FormHeader title="Profile" description="User information." onClose={toggleUserProfileDialog} />;
}
