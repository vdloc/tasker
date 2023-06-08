import { useStore } from '@/store';
import FormHeader from '../components/FormHeader';

export default function TaskCreateFormHeader() {
  const toggleTaskCreateDialog = useStore(
    (state) => state.toggleTaskCreateDialog
  );

  return (
    <FormHeader
      onClose={toggleTaskCreateDialog}
      title='Create task'
      description='Create your task.'
    />
  );
}
