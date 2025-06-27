import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const getCodePoint = (icon: IconDefinition): number =>
  parseInt(icon.icon[3], 16);
