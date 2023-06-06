type BadgeProps = {
  title: string;
};

export default function Badge({ title }: BadgeProps) {
  return title ? (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
      {title}
    </span>
  ) : null;
}
