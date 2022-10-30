import clsx from 'clsx';
import { Pressable, PressableProps } from 'react-native';
import { styled } from 'nativewind';
import { variantProps, VariantPropsOf, TTailwindProps } from './styled';
import { Text, TextProps } from './data-display';

// BUTTON

const StyledPressable = styled(Pressable);
const buttonVariantProps = variantProps({
  base: 'flex items-center justify-center',
  variants: {
    size: {
      sm: 'rounded px-2 py-1',
      md: 'rounded-lg px-4 py-2',
    },
    variant: {
      filled: '',
      text: 'bg-transparent',
    },
    color: {
      transparent: 'bg-transparent',
      primary: 'bg-stone-200 dark:stone-800',
    },
  },
  defaultVariants: {
    variant: 'filled',
    color: 'primary',
    size: 'md',
  },
});

type ButtonProps = Omit<PressableProps, 'children'> & {
  children: TextProps['children'];
  textProps?: TextProps;
} & TTailwindProps &
  VariantPropsOf<typeof buttonVariantProps>;

export function Button({
  tw,
  textProps,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(buttonVariantProps(props).className, tw, className);
  return (
    <StyledPressable {...props} tw={classes}>
      <Text {...textProps}>{children}</Text>
    </StyledPressable>
  );
}
