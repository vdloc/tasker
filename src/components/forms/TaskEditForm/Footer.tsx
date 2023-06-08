import Button from '@/components/Button';
import { useStore } from '@/store';

type TaskEditFormFooterProps = {
  onDeleteTask: () => void;
};

export default function TaskEditFormFooter({
  onDeleteTask,
}: TaskEditFormFooterProps) {
  const toggleTaskUpdateDialog = useStore(
    (state) => state.toggleTaskUpdateDialog
  );

  return (
    <>
      <Button
        type='button'
        label='Cancel'
        onClick={() => toggleTaskUpdateDialog(false)}
        color='white'
      />
      <Button
        type='button'
        label='Delete'
        className='ml-4'
        color='pink'
        onClick={onDeleteTask}
      />
      <Button type='submit' label='Save' className='ml-4' />
    </>
  );
}
