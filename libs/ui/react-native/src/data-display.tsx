import clsx from 'clsx';
import {
  View,
  ViewProps,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import { styled } from 'nativewind';
import { variantProps, VariantPropsOf, TTailwindProps } from './styled';

// BOX

const StyledView = styled(View);
const boxVariantProps = variantProps({
  base: '',
  variants: {
    center: {
      true: 'flex items-center justify-center',
    },
  },
});

export function Box({
  tw,
  children,
  className,
  ...props
}: ViewProps & TTailwindProps & VariantPropsOf<typeof boxVariantProps>) {
  return (
    <StyledView
      tw={clsx(boxVariantProps(props).className, tw, className)}
      {...props}
    >
      {children}
    </StyledView>
  );
}

// TEXT
const StyledText = styled(RNText);
const textVariantProps = variantProps({
  base: '',
  variants: {
    b: { true: 'font-bold' },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    color: {
      dark: 'text-stone-900 dark:text-stone-200',
      light: 'text-stone-100',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'dark',
  },
});

export type TextProps = RNTextProps &
  TTailwindProps &
  VariantPropsOf<typeof textVariantProps>;

export function Text({ tw, children, className, ...props }: TextProps) {
  const classes = clsx(className, tw, textVariantProps(props).className);
  return (
    <StyledText tw={classes} {...props}>
      {children}
    </StyledText>
  );
}
