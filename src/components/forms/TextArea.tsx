import { useController } from "react-hook-form";
import { InputProps } from "@/types";

export default function TextArea({ control, name, label, id }: InputProps) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={id}
          rows={4}
          className="block w-full p-2 rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          name={field.name}
          value={field.value}
          onChange={field.onChange}
        />
      </div>
    </div>
  );
}
