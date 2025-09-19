import { useState } from 'react';
import { GameCard } from '../types/game';
import { cn } from '@/lib/utils';

interface ColorCardProps {
  card: GameCard;
  onClick: (card: GameCard) => void;
  disabled?: boolean;
  showName?: boolean;
  gridColors?: string[];
}

export default function ColorCard({ card, onClick, disabled = false, showName = true, gridColors = [] }: ColorCardProps) {
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
        "relative cursor-pointer select-none transition-all duration-300",
        "hover:scale-105",
        disabled && "cursor-not-allowed opacity-60",
        card.isMatched && "animate-match-success"
      )}
      onClick={handleClick}
      data-testid={`card-${card.id}`}
      style={{
        perspective: '1000px',
        width: '220px',
        height: '280px'
      }}
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
          className="absolute inset-0 rounded-lg backface-hidden bg-white border border-slate-100 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* 6 Concentric Half-Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 6 }).map((_, index) => {
              const colorClass = gridColors[index] || 'border-gray-400';
              const size = 120 + index * 45; // Starting at 120px (40px * 3), increasing by 45px each (15px * 3)
              
              return (
                <div
                  key={`circle-${index}`}
                  className={`absolute rounded-full border ${colorClass}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderWidth: '1px',
                    borderBottom: 'none', // Remove bottom border to create half-circle
                    borderLeft: 'none', // Remove left border
                    borderRight: 'none', // Remove right border
                    fill: 'none',
                    top: '70%', // Position at 70% from top (lower on card)
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              );
            })}
          </div>
          
          {/* Text at bottom */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{ paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}
          >
            <p className="font-mono text-xs text-gray-600 uppercase text-center">
              Memory for Color Lovers
            </p>
          </div>
        </div>

        {/* Card Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg backface-hidden bg-white border border-slate-100 flex flex-col",
            card.isError && "animate-error"
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Color Swatch */}
          <div
            className="w-full rounded-t-lg border-b border-gray-200 flex-1"
            style={{
              backgroundColor: card.color.hex
            }}
            data-testid={`color-swatch-${card.color.id}`}
          />

          {/* Color Information */}
          <div
            className="bg-white flex flex-col justify-between"
            style={{
              height: 'auto',
              padding: '20px 20px 20px 20px'
            }}
          >
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