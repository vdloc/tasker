import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

const badgeStyleProps = tv({
  base: 'inline-flex items-center rounded-full py-0.5 text-xs font-medium',
  variants: {
    color: {
      indigo: 'bg-indigo-100 text-indigo-700',
      red: 'bg-red-100 text-red-700',
      lime: 'bg-lime-100 text-lime-700',
      sky: 'bg-sky-100 text-sky-700',
      zinc: 'bg-zinc-100 text-zinc-700',
      orange: 'bg-orange-100 text-orange-700',
    },
    size: {
      small: 'pl-2 pr-0.5',
      large: 'pl-2.5 pr-1',
    },
    rounded: {
      true: 'rounded-md',
    },
  },
  defaultVariants: {
    color: 'indigo',
    rounded: true,
    size: 'small',
  },
});

type OtherBadgeProps = {
  title: string;
  onClose?: () => void;
};

type BadgeProps = JSX.IntrinsicElements['span'] &
  VariantProps<typeof badgeStyleProps> &
  OtherBadgeProps;

export default function Badge({
  title,
  className,
  color,
  size,
  rounded,
  onClose,
  ...otherProps
}: BadgeProps) {
  return title ? (
    <span
      className={`${badgeStyleProps({
        color,
        size,
        rounded,
      })} ${className}`}
      {...otherProps}
    >
      {title}
      {typeof onClose === 'function' && (
        <button
          type='button'
          className='ml-0.5 inline-flex h-4 w-4 text flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none'
          onClick={() => onClose()}
        >
          <span className='sr-only'>Remove tag</span>
          <svg
            className='h-2 w-2'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 8 8'
          >
            <path
              strokeLinecap='round'
              strokeWidth='1.5'
              d='M1 1l6 6m0-6L1 7'
            />
          </svg>
        </button>
      )}
    </span>
  ) : null;
}
