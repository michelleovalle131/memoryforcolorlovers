import { useState, useEffect, useCallback } from 'react';
import { GameState, GameCard, ColorTheme } from '../types/game';
import { generateGameCards } from '../lib/colorThemes';
import GameHeader from './GameHeader';
import ColorThemeSelector from './ColorThemeSelector';
import GameBoard from './GameBoard';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function MemoryGame() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    matches: 0,
    attempts: 0,
    isComplete: false,
    selectedTheme: 'blues'
  });

  const initializeGame = useCallback((theme: ColorTheme) => {
    const colors = generateGameCards(theme);
    const shuffledColors = shuffleArray(colors);
    
    const cards: GameCard[] = shuffledColors.map((color, index) => ({
      id: `${color.id}-${index}`,
      color,
      isFlipped: false,
      isMatched: false,
      isError: false
    }));

    setGameState({
      cards,
      flippedCards: [],
      matches: 0,
      attempts: 0,
      isComplete: false,
      selectedTheme: theme
    });
  }, []);

  // Initialize game on mount
  useEffect(() => {
    initializeGame(gameState.selectedTheme);
  }, []);

  const handleThemeChange = (theme: ColorTheme) => {
    console.log('Theme changed to:', theme);
    initializeGame(theme);
  };

  const handleReset = () => {
    console.log('Game reset');
    initializeGame(gameState.selectedTheme);
  };

  const handleCardClick = useCallback((clickedCard: GameCard) => {
    if (clickedCard.isFlipped || clickedCard.isMatched || gameState.flippedCards.length >= 2) {
      return;
    }

    console.log('Card clicked:', clickedCard.color.name);

    setGameState(prevState => {
      const newFlippedCards = [...prevState.flippedCards, clickedCard];
      const newCards = prevState.cards.map(card => 
        card.id === clickedCard.id 
          ? { ...card, isFlipped: true, isError: false }
          : { ...card, isError: false }
      );

      // If this is the second card flipped
      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards;
        const isMatch = firstCard.color.hex === secondCard.color.hex;
        
        if (isMatch) {
          // Cards match
          console.log('Match found!', firstCard.color.name);
          const matchedCards = newCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          );
          
          const newMatches = prevState.matches + 1;
          const isComplete = newMatches === 6; // 6 pairs total
          
          return {
            ...prevState,
            cards: matchedCards,
            flippedCards: [],
            matches: newMatches,
            attempts: prevState.attempts + 1,
            isComplete
          };
        } else {
          // Cards don't match - show error and flip back after delay
          console.log('No match');
          const errorCards = newCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isError: true }
              : card
          );

          setTimeout(() => {
            setGameState(currentState => ({
              ...currentState,
              cards: currentState.cards.map(card =>
                card.id === firstCard.id || card.id === secondCard.id
                  ? { ...card, isFlipped: false, isError: false }
                  : card
              ),
              flippedCards: []
            }));
          }, 1500);

          return {
            ...prevState,
            cards: errorCards,
            flippedCards: newFlippedCards,
            attempts: prevState.attempts + 1
          };
        }
      }

      return {
        ...prevState,
        cards: newCards,
        flippedCards: newFlippedCards
      };
    });
  }, [gameState.flippedCards]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="space-y-8">
        {/* Game Header */}
        <GameHeader
          matches={gameState.matches}
          attempts={gameState.attempts}
          isComplete={gameState.isComplete}
          selectedTheme={gameState.selectedTheme}
          onReset={handleReset}
        />

        {/* Theme Selector */}
        <div className="max-w-4xl mx-auto">
          <ColorThemeSelector
            selectedTheme={gameState.selectedTheme}
            onThemeChange={handleThemeChange}
            disabled={gameState.flippedCards.length > 0}
          />
        </div>

        {/* Game Board */}
        <div className="pb-8">
          <GameBoard
            cards={gameState.cards}
            onCardClick={handleCardClick}
            disabled={gameState.isComplete}
          />
        </div>
      </div>
    </div>
  );
}