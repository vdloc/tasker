import Button from '@/components/common/Button';
import { useStore } from '@/store';

export default function TaskCreateFormFooter() {
  const toggleTaskCreateDialog = useStore((state) => state.toggleTaskCreateDialog);

  function handleCloseDialog() {
    toggleTaskCreateDialog(false);
  }
  return (
    <>
      <Button type="button" label="Cancel" onClick={handleCloseDialog} color="white" />
      <Button type="submit" label="Create" className="ml-4" />
    </>
  );
}
