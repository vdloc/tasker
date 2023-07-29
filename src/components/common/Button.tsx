import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const buttonStyleProps = tv({
  base: 'relative inline-flex items-center border border-transparent text-sm text-white shadow-sm font-medium focus:outline-none transition-colors',
  variants: {
    color: {
      indigo: 'focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700',
      pink: 'focus:ring-pink-500 bg-pink-600 hover:bg-pink-700',
      white: 'bg-white border-gray-300 text-black',
      gray: 'bg-gray-900 border-gray-900 text-white',
    },
    size: {
      small: 'px-2 py-1',
      large: 'px-4 py-2',
    },
    rounded: {
      medium: 'rounded-md',
    },
    hasRing: {
      default: 'focus:ring-2 focus:ring-offset-2',
    },
  },
  defaultVariants: {
    color: 'indigo',
    rounded: 'medium',
    size: 'large',
    hasRing: 'default',
  },
});

type OtherButtonProps = {
  label: string | React.ReactElement;
};

type ButtonProps = JSX.IntrinsicElements['button'] & VariantProps<typeof buttonStyleProps> & OtherButtonProps;

export default function Button({ label, color, size, rounded, hasRing, className, ...otherProps }: ButtonProps) {
  return (
    <button
      type="button"
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
