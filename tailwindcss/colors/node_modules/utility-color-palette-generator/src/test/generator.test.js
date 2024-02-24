import { generatePalette } from '../src/generator';

describe('generatePalette', () => {
  test('it generates the default number of colors', () => {
    const result = generatePalette();
    expect(result.length).toBe(5);
  });

  test('it generates the specified number of colors', () => {
    const result = generatePalette({ numColors: 3 });
    expect(result.length).toBe(3);
  });

  test('it starts with the provided starting color', () => {
    const result = generatePalette({ startingColor: 'rgb(255, 0, 0)' });
    expect(result[0].rgb).toBe('rgb(255, 0, 0)');
  });

  test('colors have expected properties', () => {
    const result = generatePalette();
    const color = result[0];
    expect(color).toHaveProperty('rgb');
    expect(color).toHaveProperty('hex');
    expect(color).toHaveProperty('hsl');
    expect(color).toHaveProperty('darkMode');
    expect(color).toHaveProperty('lightMode');
    expect(color).toHaveProperty('contrastColor');
  });

  test('contrast colors are either black or white', () => {
    const result = generatePalette();
    for (let color of result) {
      expect(['black', 'white']).toContain(color.contrastColor);
    }
  });

  test('distinct colors are generated', () => {
    const result = generatePalette({ numColors: 3 });
    expect(result[0].hsl).not.toBe(result[1].hsl);
    expect(result[0].hsl).not.toBe(result[2].hsl);
    expect(result[1].hsl).not.toBe(result[2].hsl);
  });
});

// Other tests for edge cases and additional functionality can be added as needed.
