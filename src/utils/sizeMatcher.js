export function suggestShirtSizeFromShoes(shoeSize) {
  if (shoeSize <= 39) return ["S", "M"];
  if (shoeSize <= 43) return ["M", "L"];
  if (shoeSize <= 46) return ["L", "XL"];
  return ["XL", "XXL"];
}

export function suggestPantsSizeFromShoes(shoeSize) {
  if (shoeSize <= 39) return [30, 32];
  if (shoeSize <= 43) return [32, 34];
  if (shoeSize <= 46) return [34, 36];
  return [36, 38];
}

export function suggestPantsSizeFromShirt(shirtSize) {
  if (["S", "M"].includes(shirtSize)) return [30, 32];
  if (["L"].includes(shirtSize)) return [32, 34];
  if (["XL"].includes(shirtSize)) return [34, 36];
  if (["XXL"].includes(shirtSize)) return [36, 38];
  return [];
}

export function suggestShoesSizeFromShirt(shirtSize) {
  if (["S", "M"].includes(shirtSize)) return [39, 41];
  if (["L"].includes(shirtSize)) return [42, 44];
  if (["XL", "XXL"].includes(shirtSize)) return [44, 46];
  return [];
}

export function suggestShirtSizeFromPants(pantsSize) {
  if (pantsSize <= 32) return ["S", "M"];
  if (pantsSize <= 34) return ["M", "L"];
  if (pantsSize <= 36) return ["L", "XL"];
  return ["XL", "XXL"];
}

export function suggestShoesSizeFromPants(pantsSize) {
  if (pantsSize <= 32) return [39, 41];
  if (pantsSize <= 34) return [41, 43];
  if (pantsSize <= 36) return [43, 45];
  return [45, 47];
}
