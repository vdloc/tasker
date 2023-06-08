import { useStore } from '@/store';
import FormHeader from '../components/FormHeader';
export default function TaskEditFormHeader() {
  const toggleTaskUpdateDialog = useStore(
    (state) => state.toggleTaskUpdateDialog
  );

  return (
    <FormHeader
      onClose={toggleTaskUpdateDialog}
      title='Edit task'
      description='Update task status, change due date or delete task'
    />
  );
}
