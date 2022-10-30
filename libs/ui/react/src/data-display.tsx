import * as React from 'react';
import { variantProps, VariantPropsOf } from 'classname-variants/react';
import clsx from 'clsx';
import { ElementProps } from '.';

// BOX

const boxVariantProps = variantProps({
  base: '',
  variants: {
    center: {
      true: 'flex items-center justify-center',
    },
  },
});

export function Box<T extends React.ElementType = 'div'>({
  as,
  tw,
  ...props
}: ElementProps<T> &
  VariantPropsOf<typeof boxVariantProps> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ElementProps<T>>) {
  const Component = as ?? 'div';
  return (
    <Component
      {...boxVariantProps(props)}
      className={clsx(boxVariantProps(props).className, ...[].concat(tw))}
    />
  );
}

// TEXT

const textVariantProps = variantProps({
  base: '',
  variants: {
    b: { true: 'font-bold' },
    color: {
      dark: 'text-stone-900 dark:text-stone-200',
      light: 'text-stone-100 ',
    },
  },
  defaultVariants: {
    color: 'dark',
  },
});

export function Text<T extends React.ElementType = 'p'>({
  as,
  tw = [],
  ...props
}: ElementProps<T> &
  VariantPropsOf<typeof textVariantProps> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ElementProps<T>>) {
  const Component = as ?? 'p';
  return (
    <Component
      {...textVariantProps(props)}
      className={clsx(textVariantProps(props).className, ...[].concat(tw))}
    />
  );
}

// Avatar

const avatarVariantProps = variantProps({
  base: clsx(`rounded-full bg-stone-100 ring-2 ring-stone-300`),
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function Avatar<T extends React.ElementType = 'img'>({
  as,
  tw,
  ...props
}: ElementProps<T> &
  VariantPropsOf<typeof avatarVariantProps> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ElementProps<T>>) {
  const Component = as ?? 'img';
  return (
    <Component
      {...avatarVariantProps(props)}
      className={clsx(avatarVariantProps(props).className, tw)}
    />
  );
}
