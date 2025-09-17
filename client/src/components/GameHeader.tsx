import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy } from 'lucide-react';
import { ColorTheme } from '../types/game';
import { themeDisplayNames } from '../lib/colorThemes';

interface GameHeaderProps {
  matches: number;
  attempts: number;
  isComplete: boolean;
  selectedTheme: ColorTheme;
  onReset: () => void;
}

export default function GameHeader({ 
  matches, 
  attempts, 
  isComplete,
  selectedTheme,
  onReset 
}: GameHeaderProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center space-y-6">
        {/* Game Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Memory for Color Lovers
          </h1>
          <p className="text-muted-foreground text-lg">
            Match beautiful color swatches inspired by professional paint samples
          </p>
        </div>

        {/* Game Stats and Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-card-border rounded-lg p-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="matches-count">
                {matches}/6
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Matches
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="attempts-count">
                {attempts}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Attempts
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-foreground">
                {themeDisplayNames[selectedTheme]}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Theme
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isComplete && (
              <div className="flex items-center gap-2 text-chart-1 font-medium">
                <Trophy className="w-5 h-5" />
                <span data-testid="completion-message">Complete!</span>
              </div>
            )}
            
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              className="gap-2"
              data-testid="button-reset"
            >
              <RotateCcw className="w-4 h-4" />
              New Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}