export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface GameCard {
  id: string;
  color: Color;
  isFlipped: boolean;
  isMatched: boolean;
  isError: boolean;
}

export type ColorTheme = 'reds' | 'blues' | 'greens' | 'yellows' | 'oranges' | 'mixed';

export type BoardSize = 'small' | 'medium' | 'large' | 'xl';

export const boardSizeConfig = {
  small: { pairs: 4, label: 'S - 8 Cards' },
  medium: { pairs: 6, label: 'M - 12 Cards' },
  large: { pairs: 8, label: 'L - 16 Cards' },
  xl: { pairs: 12, label: 'XL - 24 Cards' }
} as const;

export interface GameState {
  cards: GameCard[];
  flippedCards: GameCard[];
  matches: number;
  attempts: number;
  isComplete: boolean;
  selectedTheme: ColorTheme;
}