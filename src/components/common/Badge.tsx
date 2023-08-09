import colors from '@data/colors.json';
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

const variantColors: Record<string, string> = {};
const colorNames = Object.keys(colors);

colorNames.forEach((colorName) => {
  const colorData = colors[colorName as keyof typeof colors];
  variantColors[colorName as keyof typeof variantColors] = `${colorData.light} ${colorData.text}`;
});

const badgeStyleProps = tv({
  base: 'inline-flex items-center rounded-full h-5 text-xs font-medium',
  variants: {
    color: variantColors,
    size: {
      small: 'pl-2 pr-0.5',
      large: 'pl-2.5 pr-1',
    },
    rounded: {
      medium: 'rounded-md',
    },
  },
  defaultVariants: {
    color: colorNames[0],
    rounded: 'medium',
    size: 'small',
  },
});

type OtherBadgeProps = {
  title: string;
  onClose?: () => void;
};

type BadgeProps = JSX.IntrinsicElements['span'] & VariantProps<typeof badgeStyleProps> & OtherBadgeProps;

export default function Badge({ title, className, color, size, rounded, onClose, ...otherProps }: BadgeProps) {
  return title ? (
    <span
      className={`${badgeStyleProps({
        color,
        size,
        rounded,
      })} ${className || ''}`}
      {...otherProps}
    >
      <span className="inline-flex h-full items-center pb-1">{title}</span>
      {typeof onClose === 'function' && (
        <button
          type="button"
          className={`
          ml-0.5 h-4 w-4
          inline-flex text
          flex-shrink-0
          items-center justify-center
          group
          rounded-full
          hover:bg-current transition-colors
          focus:outline-none
        `}
          onClick={() => onClose()}
        >
          <span className="sr-only">Remove tag</span>
          <svg
            className={`${
              colors[color as keyof typeof colors]
            } h-2 w-2 group-hover:stroke-white group-hover:bg-current`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </span>
  ) : null;
}
