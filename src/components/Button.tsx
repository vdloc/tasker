import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

const buttonStyleProps = tv({
  base: 'relative inline-flex items-center border border-transparent text-sm text-white shadow-sm font-medium focus:outline-none transition-colors',
  variants: {
    color: {
      indigo: 'focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700',
      pink: 'focus:ring-pink-500 bg-pink-600 hover:bg-pink-700',
      white: 'bg-white border-gray-300 text-black',
    },
    size: {
      small: 'px-2 py-1',
      large: 'px-4 py-2',
    },
    rounded: {
      true: 'rounded-md',
    },
    hasRing: {
      true: 'focus:ring-2 focus:ring-offset-2',
    },
  },
  defaultVariants: {
    color: 'indigo',
    rounded: true,
    size: 'large',
    hasRing: true,
  },
});

type OtherButtonProps = {
  label: string;
};

type ButtonProps = JSX.IntrinsicElements['button'] &
  VariantProps<typeof buttonStyleProps> &
  OtherButtonProps;

export default function Button({
  label,
  color,
  size,
  rounded,
  hasRing,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      type='button'
      className={`${buttonStyleProps({
        color,
        size,
        rounded,
        hasRing,
      })} ${className}`}
      {...otherProps}
    >
      {label}
    </button>
  );
}
