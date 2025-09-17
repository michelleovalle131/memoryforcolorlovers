import { Color, ColorTheme } from '../types/game';

export const colorThemes: Record<ColorTheme, Color[]> = {
  reds: [
    { id: 'coral', name: 'Coral Blush', hex: '#FF7F7F' },
    { id: 'crimson', name: 'Crimson Red', hex: '#DC143C' },
    { id: 'burgundy', name: 'Deep Burgundy', hex: '#800020' },
    { id: 'rose', name: 'Rose Pink', hex: '#FF69B4' },
    { id: 'cherry', name: 'Cherry Red', hex: '#DE3163' },
    { id: 'scarlet', name: 'Scarlet Fire', hex: '#FF2400' },
  ],
  blues: [
    { id: 'sky', name: 'Sky Blue', hex: '#87CEEB' },
    { id: 'navy', name: 'Navy Deep', hex: '#000080' },
    { id: 'teal', name: 'Teal Ocean', hex: '#008080' },
    { id: 'ocean', name: 'Ocean Blue', hex: '#006994' },
    { id: 'royal', name: 'Royal Blue', hex: '#4169E1' },
    { id: 'powder', name: 'Powder Blue', hex: '#B0E0E6' },
  ],
  greens: [
    { id: 'sage', name: 'Sage Green', hex: '#9CAF88' },
    { id: 'forest', name: 'Forest Deep', hex: '#228B22' },
    { id: 'mint', name: 'Mint Fresh', hex: '#98FB98' },
    { id: 'olive', name: 'Olive Grove', hex: '#808000' },
    { id: 'emerald', name: 'Emerald Gem', hex: '#50C878' },
    { id: 'lime', name: 'Lime Bright', hex: '#32CD32' },
  ],
  yellows: [
    { id: 'cream', name: 'Cream Silk', hex: '#FFFDD0' },
    { id: 'golden', name: 'Golden Sun', hex: '#FFD700' },
    { id: 'amber', name: 'Amber Glow', hex: '#FFBF00' },
    { id: 'lemon', name: 'Lemon Zest', hex: '#FFF700' },
    { id: 'mustard', name: 'Mustard Field', hex: '#FFDB58' },
    { id: 'butter', name: 'Butter Cream', hex: '#FFFACD' },
  ],
  oranges: [
    { id: 'coral-orange', name: 'Coral Orange', hex: '#FF7F50' },
    { id: 'tangerine', name: 'Tangerine', hex: '#FF8C00' },
    { id: 'peach', name: 'Peach Glow', hex: '#FFCBA4' },
    { id: 'sunset', name: 'Sunset Orange', hex: '#FF4500' },
    { id: 'apricot', name: 'Apricot Soft', hex: '#FBCEB1' },
    { id: 'copper', name: 'Copper Shine', hex: '#B87333' },
  ],
  mixed: [
    { id: 'lavender', name: 'Lavender', hex: '#E6E6FA' },
    { id: 'coral-mixed', name: 'Coral Blush', hex: '#FF7F7F' },
    { id: 'sage-mixed', name: 'Sage Green', hex: '#9CAF88' },
    { id: 'golden-mixed', name: 'Golden Sun', hex: '#FFD700' },
    { id: 'sky-mixed', name: 'Sky Blue', hex: '#87CEEB' },
    { id: 'plum', name: 'Plum Purple', hex: '#8E4585' },
  ],
};

export const themeDisplayNames: Record<ColorTheme, string> = {
  reds: 'Reds',
  blues: 'Blues', 
  greens: 'Greens',
  yellows: 'Yellows',
  oranges: 'Oranges',
  mixed: 'Mixed',
};

export function generateGameCards(theme: ColorTheme): Color[] {
  const colors = colorThemes[theme];
  // Create pairs by duplicating each color
  return [...colors, ...colors];
}