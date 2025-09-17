import { GameCard } from '../types/game';
import ColorCard from './ColorCard';

interface GameBoardProps {
  cards: GameCard[];
  onCardClick: (card: GameCard) => void;
  disabled?: boolean;
}

export default function GameBoard({ cards, onCardClick, disabled = false }: GameBoardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 place-items-center"
        data-testid="game-board"
      >
        {cards.map((card) => (
          <ColorCard
            key={card.id}
            card={card}
            onClick={onCardClick}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}