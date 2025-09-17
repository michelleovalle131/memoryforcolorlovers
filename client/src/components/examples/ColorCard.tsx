import ColorCard from '../ColorCard';
import { GameCard } from '../../types/game';

export default function ColorCardExample() {
  //todo: remove mock functionality
  const mockCard: GameCard = {
    id: 'coral-1',
    color: {
      id: 'coral',
      name: 'Coral Blush', 
      hex: '#FF7F7F'
    },
    isFlipped: true,
    isMatched: false,
    isError: false
  };

  const handleClick = (card: GameCard) => {
    console.log('Card clicked:', card.color.name);
  };

  return (
    <div className="p-8 bg-background min-h-screen flex items-center justify-center">
      <ColorCard card={mockCard} onClick={handleClick} />
    </div>
  );
}