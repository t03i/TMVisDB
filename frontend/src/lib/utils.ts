// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export function convertToRGB(color: string): RGB {
  if (color.startsWith("rgb")) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return { r, g, b };
  } else if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b };
  }
  return { r: 255, g: 255, b: 0 }; // Default to yellow if parsing fails
}
