import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import ColorGrid from './ColorGrid';

interface IntroPageProps {
  onStartGame: () => void;
}

export default function IntroPage({ onStartGame }: IntroPageProps) {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#fff' }}>
      {/* Color Grid Background */}
      <ColorGrid />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl bg-stone-50 p-12" style={{ borderRadius: '0px' }}>
          {/* Game Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              <div className="text-2xl font-mono font-light uppercase">MEMORY FOR</div>
              <div>Color Lovers</div>
            </h1>
            <p className="font-mono text-muted-foreground leading-relaxed" style={{ fontSize: '15px' }}>
              Match game inspired by the beauty of colors, drawing inspiration from the paint samples I grew up with alongside my painter dad.
            </p>
          </div>

          {/* Start Game Button */}
          <div className="pt-4">
            <Button
              onClick={onStartGame}
              size="lg"
              className="gap-2 px-8 py-3 text-lg font-mono font-medium bg-transparent hover:bg-gray-100 text-foreground uppercase"
              data-testid="start-game-button"
            >
              <Palette className="w-5 h-5" />
              START GAME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}