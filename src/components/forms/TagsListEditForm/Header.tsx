import { useDialogStore } from '@/store';

import FormHeader from '../components/FormHeader';

export default function TagsListEditFormHeader() {
  const { toggleTagsListEditDialog } = useDialogStore();

  return <FormHeader onClose={toggleTagsListEditDialog} title="Tags Manager" description="Create or delete tags." />;
}
