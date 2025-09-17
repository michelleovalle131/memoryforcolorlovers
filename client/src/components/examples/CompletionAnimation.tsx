import { useState } from 'react';
import CompletionAnimation from '../CompletionAnimation';
import { GameCard } from '../../types/game';
import { Button } from '@/components/ui/button';

export default function CompletionAnimationExample() {
  //todo: remove mock functionality
  const [isComplete, setIsComplete] = useState(false);
  
  const mockMatchedCards: GameCard[] = [
    { id: 'coral-1', color: { id: 'coral', name: 'Coral Blush', hex: '#FF7F7F' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'coral-2', color: { id: 'coral', name: 'Coral Blush', hex: '#FF7F7F' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'crimson-1', color: { id: 'crimson', name: 'Crimson Red', hex: '#DC143C' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'crimson-2', color: { id: 'crimson', name: 'Crimson Red', hex: '#DC143C' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'burgundy-1', color: { id: 'burgundy', name: 'Deep Burgundy', hex: '#800020' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'burgundy-2', color: { id: 'burgundy', name: 'Deep Burgundy', hex: '#800020' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'rose-1', color: { id: 'rose', name: 'Rose Pink', hex: '#FF69B4' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'rose-2', color: { id: 'rose', name: 'Rose Pink', hex: '#FF69B4' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'cherry-1', color: { id: 'cherry', name: 'Cherry Red', hex: '#DE3163' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'cherry-2', color: { id: 'cherry', name: 'Cherry Red', hex: '#DE3163' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'scarlet-1', color: { id: 'scarlet', name: 'Scarlet Fire', hex: '#FF2400' }, isFlipped: true, isMatched: true, isError: false },
    { id: 'scarlet-2', color: { id: 'scarlet', name: 'Scarlet Fire', hex: '#FF2400' }, isFlipped: true, isMatched: true, isError: false },
  ];

  const handleTriggerAnimation = () => {
    console.log('Starting completion animation');
    setIsComplete(true);
  };

  const handleAnimationEnd = () => {
    console.log('Completion animation ended');
    setIsComplete(false);
  };

  const handleNewGame = () => {
    console.log('New Game button clicked');
    setIsComplete(false);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Completion Animation Demo</h2>
        <Button onClick={handleTriggerAnimation} disabled={isComplete}>
          Trigger Completion Animation
        </Button>
      </div>
      
      <CompletionAnimation
        isComplete={isComplete}
        matchedCards={mockMatchedCards}
        onAnimationEnd={handleAnimationEnd}
        onNewGame={handleNewGame}
      />
    </div>
  );
}