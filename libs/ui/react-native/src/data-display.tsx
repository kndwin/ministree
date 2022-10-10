import clsx from 'clsx';
import { View, ViewProps, Text as RNText, TextProps } from 'react-native';
import { styled } from 'nativewind';
import { variantProps, VariantPropsOf } from '.';

// BOX
type TTailwindProps = {
  tw?: string;
  className?: string;
};

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
  base: 'text-stone-900',
  variants: {
    b: { true: 'font-bold' },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    color: {
      dark: 'text-stone-900 dark:text-stone-100',
      light: 'text-stone-100',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'dark',
  },
});

export function Text({
  tw,
  children,
  className,
  ...props
}: TextProps & TTailwindProps & VariantPropsOf<typeof textVariantProps>) {
  return (
    <StyledText
      tw={clsx(textVariantProps(props).className, tw, className)}
      {...props}
    >
      {children}
    </StyledText>
  );
}
