import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy } from 'lucide-react';
import { ColorTheme } from '../types/game';
import { themeDisplayNames } from '../lib/colorThemes';

interface GameHeaderProps {
  matches: number;
  attempts: number;
  timer: number;
  isComplete: boolean;
  selectedTheme: ColorTheme;
  isPaused: boolean;
  onReset: () => void;
}

export default function GameHeader({ 
  matches, 
  attempts,
  timer,
  isComplete,
  selectedTheme,
  isPaused,
  onReset
}: GameHeaderProps) {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* New Game Button - Absolute positioned */}
      <div className="absolute right-0 -top-2">
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

      <div className="space-y-6">
        {/* Game Title */}
        <div className="text-left space-y-1">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            <div className="text-2xl font-mono font-light uppercase">MEMORY FOR</div>
            <div>Color Lovers</div>
          </h1>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center items-center gap-12 bg-card border border-card-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-foreground" data-testid="matches-count">
              {matches}/6
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Matches
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-foreground" data-testid="attempts-count">
              {attempts}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Attempts
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-foreground">
              {formatTime(timer)}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Time
            </div>
          </div>

          {isComplete && (
            <div className="flex items-center gap-2 text-chart-1 font-medium">
              <Trophy className="w-5 h-5" />
              <span data-testid="completion-message">Complete!</span>
            </div>
          )}
        </div>

        {/* Pause Message */}
        {isPaused && !isComplete && (
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 border border-muted-foreground/20 rounded-lg text-muted-foreground text-sm">
              <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
              Game is paused
            </div>
          </div>
        )}
      </div>
    </div>
  );
}