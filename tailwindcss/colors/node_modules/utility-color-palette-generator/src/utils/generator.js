import { rgbToHex, hslToRgb, rgbToHsl } from './conversions';
import { adjustLightness, getContrastColor } from './adjustments';

// Function to generate a random integer between min and max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to generate a random HSL color
function randomHslColor() {
  return {
    h: randomInt(0, 360),
    s: randomInt(40, 60), // Slightly controlled saturation for more aesthetic colors
    l: randomInt(40, 60), // Slightly controlled lightness for more aesthetic colors
  };
}

export function generatePalette(options = {}) {
  const { numColors = 5, startingColor = null } = options;

  let palette = [];

  if (startingColor) {
    const [_, r, g, b] = startingColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
    const { h, s, l } = rgbToHsl(r, g, b);

    palette.push({ h, s, l });
  }

  while (palette.length < numColors) {
    let color = randomHslColor();

    // Check if the color is distinct from already chosen colors
    if (
      !palette.some((existingColor) => Math.abs(existingColor.h - color.h) < 20)
    ) {
      palette.push(color);
    }
  }

  return palette.map((color) => {
    const rgb = hslToRgb(color.h, color.s, color.l);
    const hex = rgbToHex(...rgb.match(/\d+/g).map(Number));
    const hsl = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;

    const darkMode = adjustLightness(color.h, color.s, color.l, 'dark');
    const lightMode = adjustLightness(color.h, color.s, color.l, 'light');

    const contrastColor = getContrastColor(color.h, color.s, color.l);

    return {
      rgb,
      hex,
      hsl,
      darkMode,
      lightMode,
      contrastColor,
    };
  });
}
