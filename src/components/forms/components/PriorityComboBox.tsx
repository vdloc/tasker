import { FormInputProps, Priority } from '@/types';
import { classNames } from '@/utils';
import priorities from '@data/priorities.json';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useController } from 'react-hook-form';

import Label from './Label';

export default function PriorityComboBox({ control, name }: FormInputProps) {
  const { field } = useController({
    name,
    control,
  });
  const currentPriority =
    useMemo(() => priorities.find((priority) => priority.id === field.value), [field.value]) || priorities[1];
  const [selected, setSelected] = useState(currentPriority);

  function handleChange(priority: Priority) {
    setSelected(priority);
    field.onChange(priority.id);
  }

  useEffect(() => {
    handleChange(selected);
  }, []);

  return (
    <div>
      <Label label="Priority" />
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 ring-1 ring-gray-300 ring-inset">
                <span className="flex items-center">
                  <span
                    aria-label={selected.title}
                    className={classNames(selected.color, 'inline-block h-2 w-2 flex-shrink-0 rounded-full')}
                  />
                  <span className="ml-3 block truncate">{selected.title}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {priorities.map((priority) => (
                    <Listbox.Option
                      key={priority.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={priority}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(priority.color, 'inline-block h-2 w-2 flex-shrink-0 rounded-full')}
                              aria-hidden="true"
                            />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {priority.title}
                              <span className="sr-only">{priority.title}</span>
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
