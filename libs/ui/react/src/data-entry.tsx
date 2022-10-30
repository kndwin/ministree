import * as React from 'react';
import { variantProps, VariantPropsOf } from 'classname-variants/react';
import clsx from 'clsx';
import { ElementProps } from '.';

const buttonVariantProps = variantProps({
  base: clsx(
    'font-sans flex items-center gap-4 cursor-pointer',
    'focus:outline-none focus-visible:ring-2',
    'focus-visible:ring-stone-500 focus-visible:ring-opacity-75'
  ),
  variants: {
    b: { true: 'font-bold' },
    size: {
      xs: 'p-1 text-[12px]',
      sm: 'p-1 text-sm',
      base: 'px-4 py-2 text-sm rounded',
      lg: 'py-2 px-4 text-base rounded gap-4',
      icon: 'p-2 rounded border-none',
    },
    align: {
      left: 'justify-start',
      middle: 'justify-center',
      right: 'justify-end',
    },
    color: {
      transparent: 'bg-transparent hover:bg-stone-200 dark:hover:bg-stone-700',
      dark: clsx(
        'bg-stone-800 text-stone-100',
        'dark:bg-stone-800 dark:border-stone-500 dark:border'
      ),
      light: clsx(
        'bg-stone-200 text-stone-900 border-stone-200 hover:bg-stone-300',
        'dark:bg-stone-800 dark:text-stone-100 dark:border-stone-500',
        'dark:hover:bg-stone-700'
      ),
      rose: 'bg-rose-900 text-rose-100',
    },
  },
  defaultVariants: {
    size: 'base',
    color: 'light',
    align: 'middle',
  },
});

export function Button<T extends React.ElementType = 'button'>({
  as,
  tw,
  ...props
}: ElementProps<T> &
  VariantPropsOf<typeof buttonVariantProps> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ElementProps<T>>) {
  const Component = as ?? 'button';
  return (
    <Component
      {...buttonVariantProps(props)}
      className={clsx(tw, buttonVariantProps(props).className)}
    />
  );
}

const textfieldVariantProps = variantProps({
  base: clsx(
    'font-sans flex items-center justify-center',
    'focus:outline-none py-2 px-4 rounded ring-stone-300',
    'text-stone-900 bg-stone-200 ring-1 ',
    'dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-700',
    'placeholder:text-stone-500 dark:placeholder:text-stone-400'
  ),
  variants: {},
});

export function TextField<T extends React.ElementType = 'input'>({
  as,
  tw,
  ...props
}: ElementProps<T> &
  VariantPropsOf<typeof textfieldVariantProps> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ElementProps<T>>) {
  const Component = as ?? 'input';
  return (
    <Component
      {...textfieldVariantProps(props)}
      className={clsx(tw, textfieldVariantProps(props).className)}
    />
  );
}
