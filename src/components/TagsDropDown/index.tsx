import { useTagStore } from '@/store';
import { Tag } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import TagDropDownMenuItem from './MenuItem';

type TagsDropDownProps = {
  onChange: (tag: Tag) => void;
  excludeTags: (Tag | undefined)[];
};

export default function TagsDropDown({ onChange, excludeTags }: TagsDropDownProps) {
  const { tags } = useTagStore() || [];
  const selectableTags = useMemo(
    () => tags.filter(({ id }: Tag) => excludeTags.every((excludeTag) => (excludeTag as Tag).id !== id)),
    [tags, excludeTags],
  );

  const [isMenuShoulDisplay, setMenuShouldDislay] = useState(true);

  useEffect(() => {
    setMenuShouldDislay(!!(selectableTags && selectableTags.length));
  }, [selectableTags]);

  function menuButtonClickHandler() {
    if (!isMenuShoulDisplay) {
      toast.error("There aren't any tags left. Define your tags in the Tags Manager.", { id: 'No tag defined' });
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              onClick={menuButtonClickHandler}
              className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <span className="sr-only">Open tag options</span>
              <span
                title="Add tag"
                className="inline-flex w-6 h-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-indigo-700 bg-white text-indigo-700 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                <span className="sr-only">Add tag</span>
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            show={open && isMenuShoulDisplay}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 h-auto max-h-52 overflow-y-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {selectableTags.map((tag: Tag) => (
                  <TagDropDownMenuItem tag={tag} key={tag.id} handleClick={() => onChange(tag)} />
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
