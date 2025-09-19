import { ColorTheme, BoardSize } from '../types/game';
import { themeDisplayNames, colorThemes } from '../lib/colorThemes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import BoardSizeSelector from './BoardSizeSelector';

interface ColorThemeSelectorProps {
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  showColorNames: boolean;
  onToggleColorNames: (show: boolean) => void;
  selectedSize: BoardSize;
  onSizeChange: (size: BoardSize) => void;
  disabled?: boolean;
}

export default function ColorThemeSelector({
  selectedTheme,
  onThemeChange,
  showColorNames,
  onToggleColorNames,
  selectedSize,
  onSizeChange,
  disabled = false
}: ColorThemeSelectorProps) {
  const themes = Object.keys(colorThemes) as ColorTheme[];

  return (
    <div className="space-y-3">
      {/* First line: Choose Color Theme and color buttons */}
      <div className="flex items-center gap-3">
        <h3 className="font-mono text-xs text-gray-600 uppercase">
          Choose color theme
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => {
            const colors = colorThemes[theme];
            const isSelected = selectedTheme === theme;
            
            return (
              <Button
                key={theme}
                variant="outline"
                size="sm"
                onClick={() => onThemeChange(theme)}
                disabled={disabled}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 h-auto transition-all duration-200 bg-stone-50",
                  isSelected && "!border-blue-500 border-2"
                )}
                data-testid={`theme-button-${theme}`}
              >
                {/* Color preview dots */}
                <div className="flex gap-1">
                  {colors.slice(0, 3).map((color, index) => (
                    <div
                      key={color.id}
                      className="w-2 h-2 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                      data-testid={`theme-color-${theme}-${index}`}
                    />
                  ))}
                </div>
                
                <span className="font-mono text-xs text-gray-600 uppercase">
                  {themeDisplayNames[theme]}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Second line: Board sizes and Show Names toggle */}
      <div className="flex items-center gap-4">
        <BoardSizeSelector
          selectedSize={selectedSize}
          onSizeChange={onSizeChange}
          disabled={disabled}
        />
        
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-gray-600 uppercase">Show names</span>
          <button
            onClick={() => onToggleColorNames(!showColorNames)}
            disabled={disabled}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              showColorNames ? "bg-blue-500" : "bg-gray-200",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                showColorNames ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}