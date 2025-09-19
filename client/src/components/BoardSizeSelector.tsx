import { BoardSize, boardSizeConfig } from '../types/game';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BoardSizeSelectorProps {
  selectedSize: BoardSize;
  onSizeChange: (size: BoardSize) => void;
  disabled?: boolean;
  uiColor?: string;
}

export default function BoardSizeSelector({
  selectedSize,
  onSizeChange,
  disabled = false,
  uiColor = '#1d4ed8'
}: BoardSizeSelectorProps) {
  const sizes = Object.keys(boardSizeConfig) as BoardSize[];

  return (
    <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-gray-600 uppercase">No. of Cards</span>
      
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const config = boardSizeConfig[size];
          const isSelected = selectedSize === size;
          
          return (
            <Button
              key={size}
              variant="outline"
              size="sm"
              onClick={() => onSizeChange(size)}
              disabled={disabled}
              className={cn(
                "px-2 py-1 h-auto transition-all duration-200 bg-stone-50",
                isSelected && "border-2"
              )}
              style={isSelected ? { borderColor: uiColor } : {}}
              data-testid={`size-button-${size}`}
            >
              <span className="font-mono text-xs text-gray-600 uppercase">
                {config.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

