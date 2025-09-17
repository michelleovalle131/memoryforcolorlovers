import GameHeader from '../GameHeader';
import { ColorTheme } from '../../types/game';

export default function GameHeaderExample() {
  //todo: remove mock functionality
  const handleReset = () => {
    console.log('Game reset triggered');
  };

  return (
    <div className="p-8 bg-background min-h-screen space-y-8">
      {/* In Progress State */}
      <GameHeader
        matches={3}
        attempts={12}
        isComplete={false}
        selectedTheme={'blues' as ColorTheme}
        onReset={handleReset}
      />
      
      {/* Completed State */}
      <GameHeader
        matches={6}
        attempts={18}
        isComplete={true}
        selectedTheme={'greens' as ColorTheme}
        onReset={handleReset}
      />
    </div>
  );
}