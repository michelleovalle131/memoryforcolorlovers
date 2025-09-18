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
        className="grid grid-cols-4 place-items-center"
        style={{ 
          gap: '20px',
          width: 'fit-content',
          margin: '0 auto'
        }}
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