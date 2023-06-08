import { useStore } from '@/store';
import FormHeader from '../components/FormHeader';

export default function TagsListEditFormHeader() {
  const toggleTagsListEditDialog = useStore(
    (state) => state.toggleTagsListEditDialog
  );

  return (
    <FormHeader
      onClose={toggleTagsListEditDialog}
      title='Tags management'
      description='Create or delete tags.'
    />
  );
}
