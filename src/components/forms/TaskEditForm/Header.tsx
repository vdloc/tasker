import { useDialogStore } from '@/store';

import FormHeader from '../components/FormHeader';

export default function TaskEditFormHeader() {
  const { toggleTaskUpdateDialog } = useDialogStore();

  return (
    <FormHeader
      onClose={toggleTaskUpdateDialog}
      title="Edit task"
      description="Update task status, change due date or delete task"
    />
  );
}
