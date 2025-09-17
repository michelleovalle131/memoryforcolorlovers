import { useEffect, useState } from 'react';
import { GameCard } from '../types/game';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface CompletionAnimationProps {
  isComplete: boolean;
  matchedCards: GameCard[];
  onAnimationEnd?: () => void;
  onNewGame?: () => void;
}

export default function CompletionAnimation({ 
  isComplete, 
  matchedCards, 
  onAnimationEnd,
  onNewGame 
}: CompletionAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: hidden, 1: gathering, 2: showing palette

  useEffect(() => {
    if (isComplete && matchedCards.length === 12) { // 6 pairs = 12 cards
      setShowAnimation(true);
      
      // Start animation sequence
      setTimeout(() => setAnimationPhase(1), 300); // Begin gathering
      setTimeout(() => setAnimationPhase(2), 1500); // Show final palette
      
      // Cleanup after animation
      setTimeout(() => {
        onAnimationEnd?.();
        setShowAnimation(false);
        setAnimationPhase(0);
      }, 4000);
    }
  }, [isComplete, matchedCards.length, onAnimationEnd]);

  if (!showAnimation || matchedCards.length === 0) return null;

  // Get unique colors (one from each pair)
  const uniqueColors = matchedCards.reduce((acc: GameCard[], card) => {
    const existingCard = acc.find(c => c.color.hex === card.color.hex);
    if (!existingCard) {
      acc.push(card);
    }
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Celebration Text */}
        <div className={cn(
          "absolute top-1/3 text-center transition-all duration-1000 z-10",
          animationPhase >= 1 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        )}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Congratulations!
          </h2>
          <p className="text-xl md:text-2xl text-white/80">
            You've matched all colors
          </p>
        </div>

        {/* Color Palette Row */}
        <div className={cn(
          "flex gap-3 md:gap-4 transition-all duration-1500 ease-out",
          animationPhase >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          {uniqueColors.map((card, index) => (
            <div
              key={card.color.id}
              className={cn(
                "transition-all duration-700 ease-out",
                animationPhase >= 1 ? "transform translate-y-0 opacity-100" : "transform translate-y-20 opacity-0"
              )}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-20 h-28 md:w-24 md:h-32">
                {/* Color Swatch */}
                <div 
                  className="h-20 md:h-24 w-full"
                  style={{ backgroundColor: card.color.hex }}
                />
                
                {/* Color Info */}
                <div className="p-2 h-8 flex flex-col justify-center">
                  <h4 className="text-xs font-medium text-gray-900 leading-tight truncate">
                    {card.color.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Game Button */}
        <div className={cn(
          "absolute bottom-1/4 transition-all duration-1000 ease-out",
          animationPhase >= 2 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        )}>
          <Button
            onClick={onNewGame}
            size="lg"
            className="gap-2 px-8 py-3 text-lg font-semibold shadow-xl"
            data-testid="button-new-game-celebration"
          >
            <Play className="w-5 h-5" />
            Start New Game
          </Button>
        </div>

        {/* Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 bg-white rounded-full opacity-0",
                animationPhase >= 2 && "animate-ping"
              )}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}