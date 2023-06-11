import colorsSetting from '@/data/colors.json';
import { Tag } from '@/types';
import { classNames } from '@/utils';
import { Menu } from '@headlessui/react';

type TagDropDownMenuItemProps = {
  tag: Tag;
  handleClick: () => void;
};

export default function TagDropDownMenuItem({ tag, handleClick }: TagDropDownMenuItemProps) {
  const colorSetting = colorsSetting[tag.color];
  console.log('​tag.color', tag.color);
  const strongColor = colorSetting?.strong || '';
  console.log('​strongColor', strongColor);
  const lightColor = colorSetting?.light || 'bg-gray-200';

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={classNames(
            active ? `${lightColor} text-gray-900` : 'text-gray-700',
            'flex items-center px-4 py-2 text-sm gap-4 transition-colors',
          )}
          onClick={handleClick}
          onKeyDown={handleClick}
          role="presentation"
        >
          <div className={`w-2 h-2 rounded-full border ${strongColor}`}></div>
          <span>{tag.name}</span>
        </div>
      )}
    </Menu.Item>
  );
}
