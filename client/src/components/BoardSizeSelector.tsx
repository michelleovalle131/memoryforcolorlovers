import { BoardSize, boardSizeConfig } from '../types/game';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BoardSizeSelectorProps {
  selectedSize: BoardSize;
  onSizeChange: (size: BoardSize) => void;
  disabled?: boolean;
}

export default function BoardSizeSelector({
  selectedSize,
  onSizeChange,
  disabled = false
}: BoardSizeSelectorProps) {
  const sizes = Object.keys(boardSizeConfig) as BoardSize[];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Board Size
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => {
          const config = boardSizeConfig[size];
          const isSelected = selectedSize === size;
          
          return (
            <Button
              key={size}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSizeChange(size)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-2 px-3 py-2 h-auto transition-all duration-200",
                isSelected && "ring-2 ring-primary/20"
              )}
              data-testid={`size-button-${size}`}
            >
              <span className="text-xs font-medium">
                {config.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

