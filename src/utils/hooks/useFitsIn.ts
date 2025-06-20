import { useViewportWidth } from "./useViewportWidth";

export const Display = {
  DESKTOP: "desktop",
  TABLET: "tablet",
  MOBILE: "mobile",
  TINY_MOBILE: "tinyMobile",
} as const;

export type Display = (typeof Display)[keyof typeof Display];

export const displayBreakpoint: Record<Display, number> = {
  [Display.TINY_MOBILE]: 400,
  [Display.MOBILE]: 968,
  [Display.TABLET]: 1200,
  [Display.DESKTOP]: Infinity,
};

export const useFitsIn = (breakpoint: Display): boolean => {
  const width = useViewportWidth();

  switch (breakpoint) {
    case Display.TINY_MOBILE:
      return width <= displayBreakpoint[Display.TINY_MOBILE];
    case Display.MOBILE:
      return width < displayBreakpoint[Display.MOBILE];
    case Display.TABLET:
      return width < displayBreakpoint[Display.TABLET];
    case Display.DESKTOP:
    default:
      return width >= displayBreakpoint[Display.TABLET];
  }
};
