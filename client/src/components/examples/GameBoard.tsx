import GameBoard from '../GameBoard';
import { GameCard } from '../../types/game';
import { generateGameCards } from '../../lib/colorThemes';

export default function GameBoardExample() {
  //todo: remove mock functionality
  const colors = generateGameCards('reds');
  const mockCards: GameCard[] = colors.map((color, index) => ({
    id: `card-${index}`,
    color,
    isFlipped: index < 4, // Show first 4 cards flipped for demo
    isMatched: index === 0 || index === 6, // Show first pair as matched
    isError: false
  }));

  const handleCardClick = (card: GameCard) => {
    console.log('Card clicked:', card.color.name);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <GameBoard cards={mockCards} onCardClick={handleCardClick} />
    </div>
  );
}