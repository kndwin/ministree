import clsx from 'clsx';
import { View, ViewProps } from 'react-native';
import { styled } from 'nativewind';
import {  variantProps, VariantPropsOf } from '.';

// BOX
type TTailwindProps = {
  tw?: string;
  className?: string;
};

const StyledView = styled(View);
const boxVariantProps = variantProps({
  base: "",
  variants: {
    center: {
      true: "flex items-center justify-center",
    },
  },
});

export function Box({
  tw,
  children,
  className,
  ...props
}: ViewProps & TTailwindProps & { center?: boolean }) {
  return (
    <StyledView tw={clsx(classes(variantProps), tw, className)} {...props}>
      {children}
    </StyledView>
  );
}
