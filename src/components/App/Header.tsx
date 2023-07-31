import configs from '@/data/configs.json';
import { useDialogStore } from '@/store';

import Button from '../common/Button';

const {
  app: { name, description },
} = configs;

export default function AppHeader() {
  const { toggleTaskCreateDialog } = useDialogStore();

  function handleCreateTaskButtonClick() {
    toggleTaskCreateDialog(true);
  }

  return (
    <div className="border-b border-gray-200 bg-white px-4 h-20 md:h-28 grid items-center">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between md:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-2xl font-medium leading-6 text-gray-900 text-left">{name}</h3>
          <p className="mt-2 text-sm text-gray-500 italic font-medium">{description}</p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <Button type="button" label="Create" onClick={handleCreateTaskButtonClick} />
        </div>
      </div>
    </div>
  );
}
