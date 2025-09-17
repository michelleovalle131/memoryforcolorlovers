import { useState } from 'react';
import { GameCard } from '../types/game';
import { cn } from '@/lib/utils';

interface ColorCardProps {
  card: GameCard;
  onClick: (card: GameCard) => void;
  disabled?: boolean;
  showName?: boolean;
}

export default function ColorCard({ card, onClick, disabled = false, showName = true }: ColorCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled || card.isMatched || isAnimating) return;
    
    setIsAnimating(true);
    onClick(card);
    
    // Reset animation state after flip completes
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div 
      className={cn(
        "relative w-36 h-44 cursor-pointer select-none transition-all duration-300",
        "hover:scale-105 hover:shadow-lg",
        disabled && "cursor-not-allowed opacity-60",
        card.isMatched && "animate-match-success"
      )}
      onClick={handleClick}
      data-testid={`card-${card.id}`}
      style={{ perspective: '1000px' }}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-800 preserve-3d",
          card.isFlipped && "rotate-y-180"
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 rounded-lg shadow-lg backface-hidden bg-gradient-to-br from-card to-muted border border-card-border"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full w-full flex items-center justify-center rounded-lg bg-gradient-to-br from-card via-muted to-card border border-card-border">
            <div className="text-muted-foreground font-mono text-sm tracking-wider">
              SWATCH
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg shadow-lg backface-hidden bg-white border border-card-border",
            card.isError && "animate-error"
          )}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Color Swatch */}
          <div 
            className="h-24 w-full rounded-t-lg border-b border-gray-200"
            style={{ backgroundColor: card.color.hex }}
            data-testid={`color-swatch-${card.color.id}`}
          />
          
          {/* Color Information */}
          <div className="p-3 h-20 flex flex-col justify-between">
            <div>
              {showName && (
                <h3 
                  className="font-medium text-sm text-gray-900 leading-tight"
                  data-testid={`color-name-${card.color.id}`}
                >
                  {card.color.name}
                </h3>
              )}
              <p 
                className="font-mono text-xs text-gray-600 mt-1"
                data-testid={`color-hex-${card.color.id}`}
              >
                {card.color.hex}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom CSS for 3D flip effect
const style = `
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = style;
  document.head.appendChild(styleSheet);
}