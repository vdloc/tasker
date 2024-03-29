import { FormInputProps } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { useController } from 'react-hook-form';

import Label from './Label';

export default function TextArea({ control, rules, name, label, id }: FormInputProps) {
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <Label label={label} id={id} />
      <div className="mt-1">
        <textarea
          id={id}
          rows={4}
          className={`block w-full p-2 rounded-md border shadow-sm ring-1 ring-gray-300 ring-inset focus:border-indigo-500 focus:ring-indigo-500 md:text-sm ${
            fieldState.error && 'border-red-800 focus:border-red-800 focus:ring-red-800'
          }`}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
        />
      </div>
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => <p className="text-red-800 text-xs mt-1">{message}</p>}
      />
    </div>
  );
}
