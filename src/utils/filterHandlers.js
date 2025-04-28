export function filterItems({
  items,
  clothingType,
  recommendedColors,
  recommendedSizes,
  color,
  size,
}) {
  let filtered = items;

  if (recommendedColors.length > 0) {
    filtered = filtered.filter((item) =>
      recommendedColors.includes(item.color)
    );
  }

  if (recommendedSizes.length > 0 && clothingType !== "shoes") {
    filtered = filtered.filter((item) =>
      recommendedSizes.includes(String(item.size))
    );
  }

  if (color) {
    filtered = filtered.filter((item) => item.color === color);
  }

  if (size) {
    filtered = filtered.filter((item) => String(item.size) === String(size));
  }

  if (filtered.length === 0) {
    filtered = items;
  }

  return filtered;
}
