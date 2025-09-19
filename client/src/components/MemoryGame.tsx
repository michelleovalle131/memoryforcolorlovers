import { useState, useEffect, useCallback } from 'react';
import { GameState, GameCard, ColorTheme, BoardSize, boardSizeConfig } from '../types/game';
import { colorThemes } from '../lib/colorThemes';
import IntroPage from './IntroPage';
import GameHeader from './GameHeader';
import ColorThemeSelector from './ColorThemeSelector';
import GameBoard from './GameBoard';
import CompletionAnimation from './CompletionAnimation';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Generate random grid colors once - now for 5x10 grid (50 dots)
function generateGridColors(): string[] {
  const colors = [
    // 400 values - vibrant colors only
    'border-red-400', 'border-orange-400', 'border-amber-400', 'border-yellow-400',
    'border-lime-400', 'border-green-400', 'border-emerald-400', 'border-teal-400',
    'border-cyan-400', 'border-sky-400', 'border-blue-400', 'border-indigo-400',
    'border-violet-400', 'border-purple-400', 'border-fuchsia-400', 'border-pink-400',
    'border-rose-400',
    
    // 500 values - vibrant colors only
    'border-red-500', 'border-orange-500', 'border-amber-500', 'border-yellow-500',
    'border-lime-500', 'border-green-500', 'border-emerald-500', 'border-teal-500',
    'border-cyan-500', 'border-sky-500', 'border-blue-500', 'border-indigo-500',
    'border-violet-500', 'border-purple-500', 'border-fuchsia-500', 'border-pink-500',
    'border-rose-500'
  ];
  
  // Generate 6 random colors for the concentric circles (one per circle)
  return Array.from({ length: 6 }, () => colors[Math.floor(Math.random() * colors.length)]);
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
  
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showColorNames, setShowColorNames] = useState<boolean>(true);
  const [boardSize, setBoardSize] = useState<BoardSize>('medium');
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [gridColors, setGridColors] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !gameState.isComplete && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameState.isComplete, isPaused]);

  // Inactivity detection - auto pause after 15 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTimerRunning && !isPaused && !gameState.isComplete) {
      timeout = setTimeout(() => {
        setIsPaused(true);
        console.log('Game auto-paused due to inactivity');
      }, 15000);
    }

    return () => clearTimeout(timeout);
  }, [lastActivity, isTimerRunning, isPaused, gameState.isComplete]);

  // Update activity timestamp on user interaction
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
    if (isPaused) {
      setIsPaused(false);
      console.log('Game resumed due to activity');
    }
  }, [isPaused]);

  // Add mouse movement detection for unpausing
  useEffect(() => {
    const handleMouseMove = () => {
      if (isPaused) {
        updateActivity();
      }
    };

    if (isPaused) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPaused, updateActivity]);

  const initializeGame = useCallback((theme: ColorTheme, size: BoardSize = boardSize) => {
    const requiredPairs = boardSizeConfig[size].pairs;
    const baseColors = colorThemes[theme];
    const selectedColors = baseColors.slice(0, requiredPairs);
    const cardPairs = [...selectedColors, ...selectedColors]; // Double the cards to create pairs
    const shuffledCards = shuffleArray(cardPairs);
    
    const cards: GameCard[] = shuffledCards.map((color, index) => ({
      id: `${color.id}-${index}`,
      color,
      isFlipped: false,
      isMatched: false,
      isError: false
    }));

    // Generate new grid colors for this game
    const newGridColors = generateGridColors();

    setGameState({
      cards,
      flippedCards: [],
      matches: 0,
      attempts: 0,
      isComplete: false,
      selectedTheme: theme
    });
    
    setGridColors(newGridColors);
  }, [boardSize]);

  // Initialize game on mount - removed to show intro page first
  // useEffect(() => {
  //   initializeGame(gameState.selectedTheme);
  // }, []);

  const handleThemeChange = (theme: ColorTheme) => {
    console.log('Theme changed to:', theme);
    updateActivity();
    initializeGame(theme, boardSize);
  };

  const handleSizeChange = (size: BoardSize) => {
    console.log('Board size changed to:', size);
    updateActivity();
    setBoardSize(size);
    initializeGame(gameState.selectedTheme, size);
  };

  const handleReset = () => {
    console.log('Game reset');
    setTimer(0);
    setIsTimerRunning(false);
    setIsPaused(false);
    setLastActivity(Date.now());
    initializeGame(gameState.selectedTheme);
  };

  const handleStartGame = () => {
    console.log('Game started');
    setGameStarted(true);
    initializeGame(gameState.selectedTheme);
  };

  const handleAnimationEnd = () => {
    console.log('Completion animation finished');
  };

  const handleCardClick = useCallback((clickedCard: GameCard) => {
    // Update activity timestamp first (this will unpause if paused)
    updateActivity();

    if (clickedCard.isFlipped || clickedCard.isMatched || gameState.flippedCards.length >= 2) {
      return;
    }

    // Start timer on first card flip
    if (!isTimerRunning) {
      setIsTimerRunning(true);
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
          const isComplete = newMatches === boardSizeConfig[boardSize].pairs;

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

          // Flip back first card
          setTimeout(() => {
            setGameState(currentState => ({
              ...currentState,
              cards: currentState.cards.map(card =>
                card.id === firstCard.id
                  ? { ...card, isFlipped: false, isError: false }
                  : card
              )
            }));
          }, 1000);

          // Flip back second card with a slight delay
          setTimeout(() => {
            setGameState(currentState => ({
              ...currentState,
              cards: currentState.cards.map(card =>
                card.id === secondCard.id
                  ? { ...card, isFlipped: false, isError: false }
                  : card
              ),
              flippedCards: []
            }));
          }, 1200);

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
  }, [gameState.flippedCards, updateActivity, isTimerRunning, boardSize]);

  // Get all matched cards for the completion animation
  const matchedCards = gameState.cards.filter(card => card.isMatched);

  // Show intro page if game hasn't started
  if (!gameStarted) {
    return <IntroPage onStartGame={handleStartGame} />;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="space-y-8">
        {/* Game Header */}
        <GameHeader
          matches={gameState.matches}
          attempts={gameState.attempts}
          timer={timer}
          isComplete={gameState.isComplete}
          selectedTheme={gameState.selectedTheme}
          isPaused={isPaused}
          onReset={handleReset}
        />

        {/* Game Controls */}
        <div className="max-w-4xl mx-auto space-y-6">
          <ColorThemeSelector
            selectedTheme={gameState.selectedTheme}
            onThemeChange={handleThemeChange}
            showColorNames={showColorNames}
            onToggleColorNames={setShowColorNames}
            selectedSize={boardSize}
            onSizeChange={handleSizeChange}
            disabled={gameState.flippedCards.length > 0 || isPaused}
          />
        </div>

        {/* Game Board */}
        <div className="pb-8">
          <GameBoard
            cards={gameState.cards}
            onCardClick={handleCardClick}
            disabled={gameState.isComplete || isPaused}
            showColorNames={showColorNames}
            gridColors={gridColors}
          />
        </div>
      </div>

      {/* Completion Animation */}
      <CompletionAnimation
        isComplete={gameState.isComplete}
        matchedCards={matchedCards}
        onAnimationEnd={handleAnimationEnd}
        onNewGame={handleReset}
      />
    </div>
  );
}