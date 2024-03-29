import { FormInputProps } from '@/types';
import { classNames } from '@/utils';
import colors from '@data/colors.json';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import Label from './Label';

const colorsName = Object.keys(colors);

export default function TagsCombobox({ label, className, name, control }: FormInputProps) {
  const { field } = useController({
    name,
    control,
  });
  const [selected, setSelected] = useState(field.value || colorsName[0]);
  const colorsClassName = colors[selected as keyof typeof colors].strong;

  function handleChange(color: keyof typeof colors) {
    setSelected(color);
    field.onChange(color);
  }

  useEffect(() => {
    handleChange(selected);
  }, []);

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className={className}>
          <Label label={label} />
          <div className="relative mt-1">
            <Listbox.Button
              className={`
             relative w-full cursor-default
             rounded-md border border-gray-300 ring-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm
             focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
             md:text-sm text-left
            `}
            >
              <span className="flex items-center">
                <span className={classNames(colorsClassName, 'inline-block h-2 w-2 flex-shrink-0 rounded-full')} />
                <span className="ml-3 block truncate">{selected}</span>
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:text-sm">
                {colorsName.map((color) => (
                  <Listbox.Option
                    key={color}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={color}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              colors[color as keyof typeof colors].strong,
                              'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {color}
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
        </div>
      )}
    </Listbox>
  );
}
