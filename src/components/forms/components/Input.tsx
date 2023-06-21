import { FormInputProps } from '@/types';
import { useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export default function Input({
  control,
  rules,
  name,
  label,
  id,
  className,
  type,
}: FormInputProps) {
  const { field, formState, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={className}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-900'>
        {label}
      </label>
      <div className='mt-1'>
        <input
          type={type || 'text'}
          id={id}
          className={`block w-full p-2 rounded-md border shadow-sm ring-1 ring-inset ring-gray-300 focus:border-indigo-500 focus:ring-indigo-500 md:text-sm ${
            fieldState.error &&
            'border-pink-600 focus:border-pink-600 focus:ring-pink-600'
          }`}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          ref={field.ref}
        />
      </div>
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => (
          <p className='text-pink-600 text-xs mt-1 whitespace-nowrap'>
            {message}
          </p>
        )}
      />
    </div>
  );
}
