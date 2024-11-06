// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export function convertToRGB(color: string): RGB {
  // Handle rgb(n n n), rgba(n n n), and n n n formats
  const rgbMatch = color.match(/^(?:rgba?\(\s*)?(\d+)\s+(\d+)\s+(\d+)(?:\s*\))?$/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch.map(Number);
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
