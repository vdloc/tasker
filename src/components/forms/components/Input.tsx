import { FormInputProps } from '@/types';
import { useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export default function Input({ control, rules, name, label, id, className }: FormInputProps) {
  const { field, formState, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          id={id}
          className={`block w-full p-2 rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            fieldState.error && 'border-red-800 focus:border-red-800 focus:ring-red-800'
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
        render={({ message }) => <p className="text-red-800 text-xs mt-1 whitespace-nowrap">{message}</p>}
      />
    </div>
  );
}
