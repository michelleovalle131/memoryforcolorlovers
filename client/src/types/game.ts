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

export type ColorTheme = 'reds' | 'blues' | 'greens' | 'yellows' | 'oranges' | 'violets' | 'mixed';

export type BoardSize = 'small' | 'medium' | 'large' | 'xl';

export const boardSizeConfig = {
  small: { pairs: 4, label: '8' },
  medium: { pairs: 6, label: '12' },
  large: { pairs: 8, label: '16' },
  xl: { pairs: 12, label: '24' }
} as const;

export interface GameState {
  cards: GameCard[];
  flippedCards: GameCard[];
  matches: number;
  attempts: number;
  isComplete: boolean;
  selectedTheme: ColorTheme;
}