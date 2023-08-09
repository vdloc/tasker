import { useDialogStore } from '@/store';

import FormHeader from '../components/FormHeader';

export default function SettingsFormHeader() {
  const { toggleUserProfileDialog } = useDialogStore();
  return <FormHeader title="Settings" description="Setting information." onClose={toggleUserProfileDialog} />;
}
