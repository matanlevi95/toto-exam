// utils/colorMatcher.js

const colorMatches = {
  black: ["white", "red", "pink", "green"],
  white: ["black", "pink", "green"],
  red: ["black", "white"],
  green: ["white", "black"],
  pink: ["white", "black"],
};

export function suggestMatchingColors(baseColor) {
  return colorMatches[baseColor] || [];
}
