import { FormInputProps } from '@/types';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import Datepicker from 'tailwind-datepicker-react';

type DateTimePickerProps = {
  title: string;
};

const pickerOptions = {
  autoHide: false,
  todayBtn: true,
  clearBtn: true,
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'z-50',
    todayBtn:
      'bg-indigo-700 hover:bg-indigo-800 hover:shadow-lg transition duration-300 focus:ring-1',
    clearBtn:
      'text-indigo-700 hover:shadow-lg transition-colors duration-300 focus:ring-1',
    icons: 'text-indigo-700 transition duration-300',
    text: 'text-indigo-700 hover:text-indigo-700 transition duration-300 text-sm',
    disabledText: 'bg-white',
    input:
      'block peer pl-10 rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
    inputIcon: 'fill-indigo-700',
    selected: 'bg-indigo-700',
  },
  icons: {
    prev: () => (
      <span>
        <ArrowLeftIcon className='w-5 h-5 stroke-2 ' />
      </span>
    ),
    next: () => (
      <span>
        <ArrowRightIcon className='w-5 h-5 stroke-2' />
      </span>
    ),
  },
  datepickerClassNames: 'top-12 text-sm',
  language: 'en',
};

export default function DateTimePicker({
  title,
  control,
  name,
  label,
}: DateTimePickerProps & FormInputProps) {
  const [show, setShow] = useState(false);
  const { field } = useController({
    name,
    control,
  });
  const handleChange = (selectedDate: Date) => {
    field.onChange(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const defaultDate = field.value instanceof Date ? field.value : new Date();
  const options = { title, defaultDate, ...pickerOptions };

  return (
    <div>
      <label className='block text-sm font-medium text-gray-900'>{label}</label>
      <div className='mt-1'>
        <Datepicker
          options={options}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
        />
      </div>
    </div>
  );
}
