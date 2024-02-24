# Color Palette Generator

A utility to generate aesthetic color palettes in multiple formats (RGB, HEX, HSL) with dark and light mode variations.

## Features:

- Generate random color palettes.
- Specify the number of colors in the palette.
- Provide a starting color for the palette.
- Get RGB, HEX, and HSL values for each color.
- Receive a dark mode and light mode variation for each color.
- Get a contrast color for text readability for each color.

## Installation:

    npm install utility-color-palette-generator

...

## Usage:

Here's how to use the utility color palette generator:

    javascript
    import { generatePalette } from 'utility-color-palette-generator';

    // Generate a default palette with 5 colors
    const defaultPalette = generatePalette();

    // Generate a palette with 3 colors
    const threeColorPalette = generatePalette({ numColors: 3 });

    // Generate a palette starting with a specific RGB color
    const redStartingPaletteRGB = generatePalette({ startingColor: 'rgb(255, 0, 0)' });

    // Generate a palette starting with a specific HEX color
    const redStartingPaletteHEX = generatePalette({ startingColor: '#FF0000' });

    // Generate a palette starting with a specific HSL color
    const redStartingPaletteHSL = generatePalette({ startingColor: 'hsl(0, 100%, 50%)' });

Each color in the returned palette will have properties: rgb, hex, hsl, darkMode, lightMode, and contrastColor.

Testing:
The package includes a suite of tests. You can run them with:

    npm test

Contributing:
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

License:
MIT

---

Remember to adjust any specifics such as repository details, badges, or other project-specific information you might want to include. The README provides a brief introduction to the project, explains its features, and offers a guide on how to use it, which should make it easier for users and contributors to understand the project's purpose and functionality.
