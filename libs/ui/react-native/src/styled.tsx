import {
  ComponentProps,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  forwardRef,
  createElement,
} from 'react';

export type TTailwindProps = {
  tw?: string;
  className?: string;
};
/**
 * Definition of the available variants and their options.
 * @example
 * {
 *   color: {
 *     white: "bg-white"
 *     green: "bg-green-500",
 *   },
 *   size: {
 *     small: "text-xs",
 *     large: "text-lg"
 *   }
 * }
 */
export declare type Variants = Record<string, Record<string, string>>;
/**
 * Configuration including defaults and compound variants.
 */
export interface VariantsConfig<V extends Variants> {
  base?: string;
  variants: V;
  compoundVariants?: CompoundVariant<V>[];
  defaultVariants?: Partial<OptionsOf<V>>;
}
/**
 * Rules for class names that are applied for certain variant combinations.
 */
export interface CompoundVariant<V extends Variants> {
  variants: Partial<OptionsOf<V>>;
  className: string;
}
/**
 * Only the boolean variants, i.e. ones that have "true" or "false" as options.
 */
declare type BooleanVariants<V extends Variants> = {
  [K in keyof V as V[K] extends
    | {
        true: any;
      }
    | {
        false: any;
      }
    ? K
    : never]: V[K];
};
/**
 * Only the variants for which a default options is set.
 */
declare type DefaultVariants<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
> = {
  [K in keyof V as K extends keyof C['defaultVariants']
    ? K
    : never]: C['variants'][K];
};
/**
 * Names of all optional variants, i.e. booleans or ones with default options.
 */
declare type OptionalVariantNames<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
> = keyof BooleanVariants<V> | keyof DefaultVariants<C>;
/**
 * Possible options for all the optional variants.
 *
 * @example
 * {
 *   color?: "white" | "green",
 *   rounded?: boolean | undefined
 * }
 */
declare type OptionalOptions<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
> = {
  [K in keyof V as K extends OptionalVariantNames<C>
    ? K
    : never]?: OptionsOf<V>[K];
};
/**
 * Possible options for all required variants.
 *
 * @example {
 *   size: "small" | "large"
 * }
 */
declare type RequiredOptions<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
> = {
  [K in keyof V as K extends OptionalVariantNames<C>
    ? never
    : K]: OptionsOf<V>[K];
};
/**
 * Utility type to extract the possible options.
 * Converts "true" | "false" options into booleans.
 *
 * @example
 * OptionsOf<{
 *   size: { small: "text-xs"; large: "text-lg" };
 *   rounded: { true: "rounded-full" }
 * }>
 * ==>
 * {
 *   size: "text-xs" | "text-lg";
 *   rounded: boolean;
 * }
 */
declare type OptionsOf<V extends Variants> = {
  [K in keyof V]: keyof V[K] extends 'true' | 'false' ? boolean : keyof V[K];
};
/**
 * Extracts the possible options.
 */
export declare type VariantOptions<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
> = RequiredOptions<C> & OptionalOptions<C>;
/**
 * Without this conversion step, defaultVariants and compoundVariants will
 * allow extra keys, i.e. non-existent variants.
 * See https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts
 */
export declare type Simplify<T> = {
  [K in keyof T]: T[K];
};
export function variants<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
>(config: Simplify<C>) {
  const { base, variants, compoundVariants, defaultVariants } = config;

  const isBooleanVariant = (name: keyof V) => {
    const v = variants?.[name];
    return v && ('false' in v || 'true' in v);
  };

  return (props: VariantOptions<C>) => {
    const res = [base];

    const getSelected = (name: keyof V) =>
      (props as any)[name] ??
      defaultVariants?.[name] ??
      (isBooleanVariant(name) ? false : undefined);

    for (let name in variants) {
      const selected = getSelected(name);
      if (selected !== undefined) res.push(variants[name]?.[selected]);
    }

    for (let { variants, className } of compoundVariants ?? []) {
      const isSelected = (name: string) => getSelected(name) === variants[name];
      if (Object.keys(variants).every(isSelected)) {
        res.push(className);
      }
    }
    return res.filter(Boolean).join(' ');
  };
}

/**
 * Utility type to infer the first argument of a variantProps function.
 */
export type VariantPropsOf<T> = T extends (props: infer P) => any ? P : never;

/**
 * Type for the variantProps() argument – consists of the VariantOptions and an optional className for chaining.
 */
type VariantProps<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
> = VariantOptions<C> & { className?: string };

export function variantProps<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
>(config: Simplify<C>) {
  const variantClassName = variants<C>(config);
  return <P extends VariantProps<C>>(props: P) => {
    const result: any = {};

    // Pass-through all unrelated props
    for (let prop in props) {
      if (config.variants && !(prop in config.variants)) {
        result[prop] = props[prop];
      }
    }

    // Add the optionally passed className prop for chaining
    result.className = [props.className, variantClassName(props)]
      .filter(Boolean)
      .join(' ');

    return result as { className: string } & Omit<P, keyof C['variants']>;
  };
}

type StyledComponent<
  T extends ElementType,
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
> = ForwardRefExoticComponent<
  PropsWithoutRef<ComponentProps<T> & VariantOptions<C>> &
    React.RefAttributes<T>
>;

type VariantsOf<T> = T extends VariantsConfig<infer V> ? V : {};

export function styled<
  T extends ElementType,
  C extends VariantsConfig<V>,
  V extends Variants = VariantsOf<C>
>(type: T, config: string | Simplify<C>): StyledComponent<T, C> {
  const styledProps =
    typeof config === 'string'
      ? variantProps({ base: config, variants: {} })
      : variantProps(config);
  return forwardRef<T, ComponentProps<T> & VariantOptions<C>>((props, ref) =>
    createElement(type, { ...styledProps(props), ref })
  );
}
