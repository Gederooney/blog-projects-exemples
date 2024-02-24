// Adjusts the lightness of an HSL color based on a given mode
export function adjustLightness(h, s, l, mode) {
  let adjustedL = l;

  if (mode === 'dark') {
    adjustedL = l - 20 < 0 ? 0 : l - 20;
  } else if (mode === 'light') {
    adjustedL = l + 20 > 100 ? 100 : l + 20;
  }

  return `hsl(${h}, ${s}%, ${adjustedL}%)`;
}

// Adjusts the saturation of an HSL color based on a given mode
export function adjustSaturation(h, s, l, mode) {
  let adjustedS = s;

  if (mode === 'desaturate') {
    adjustedS = s - 20 < 0 ? 0 : s - 20;
  } else if (mode === 'saturate') {
    adjustedS = s + 20 > 100 ? 100 : s + 20;
  }

  return `hsl(${h}, ${adjustedS}%, ${l}%)`;
}

// Inverts the given HSL color
export function invertColor(h, s, l) {
  let invertedH = (h + 180) % 360;
  let invertedS = 100 - s;
  let invertedL = 100 - l;

  return `hsl(${invertedH}, ${invertedS}%, ${invertedL}%)`;
}

// Provides a contrast color for given HSL values
export function getContrastColor(h, s, l) {
  // Using W3C recommendation for contrast determination
  return l > 50 ? 'black' : 'white';
}

// Future adjustments can be added here.
