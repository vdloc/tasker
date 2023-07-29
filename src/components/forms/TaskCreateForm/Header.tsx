import { useDialogStore } from '@/store';

import FormHeader from '../components/FormHeader';

export default function TaskCreateFormHeader() {
  const toggleTaskCreateDialog = useDialogStore((state) => state.toggleTaskCreateDialog);

  return <FormHeader onClose={toggleTaskCreateDialog} title="Create task" description="Create your task." />;
}
