interface LabelProps {
  label: string;
  id?: string;
}

export default function Label({ label, id }: LabelProps) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-gray-900">
      {label}
    </label>
  );
}
