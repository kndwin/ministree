export * from './data-display';
export * from './data-entry';
export * from './overlay';
export * from './svg';
export { Transition } from '@headlessui/react';
export { styled } from 'classname-variants/react';

export interface ElementProps<T extends React.ElementType> {
  as?: T;
  tw?: string | string[];
  children?: React.ReactNode;
}
