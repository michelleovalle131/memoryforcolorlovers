import { GameCard } from '../types/game';
import ColorCard from './ColorCard';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  cards: GameCard[];
  onCardClick: (card: GameCard) => void;
  disabled?: boolean;
  showColorNames?: boolean;
}

export default function GameBoard({ cards, onCardClick, disabled = false, showColorNames = true }: GameBoardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className={cn(
          "grid gap-4 md:gap-6 place-items-center",
          cards.length <= 8 && "grid-cols-2 md:grid-cols-4",
          cards.length <= 12 && cards.length > 8 && "grid-cols-3 md:grid-cols-4",
          cards.length <= 16 && cards.length > 12 && "grid-cols-4",
          cards.length > 16 && "grid-cols-4 md:grid-cols-6"
        )}
        data-testid="game-board"
      >
        {cards.map((card) => (
          <ColorCard
            key={card.id}
            card={card}
            onClick={onCardClick}
            disabled={disabled}
            showName={showColorNames}
          />
        ))}
      </div>
    </div>
  );
}