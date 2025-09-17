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

export interface GameState {
  cards: GameCard[];
  flippedCards: GameCard[];
  matches: number;
  attempts: number;
  isComplete: boolean;
  selectedTheme: ColorTheme;
}