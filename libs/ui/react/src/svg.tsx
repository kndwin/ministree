import clsx from 'clsx';
import { SVGProps } from 'react';

type CustomSVGProps = {
  size?: number;
  color?: string;
  className?: string;
} & SVGProps<SVGSVGElement>;

export const LogoIcon = ({
  size = 32,
  color = '#000',
  className,
  ...props
}: CustomSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={clsx(
      'fill-transparent',
      'stroke-stone-800 dark:stroke-stone-200',
      className
    )}
    {...props}
  >
    <circle cx={50} cy={39} r={24.5} stroke="currentcolor" />
    <path stroke="currentcolor" d="M50.5 40v46M50.588 56.283l-11-16" />
  </svg>
);
