import { ColorTheme } from '../types/game';
import { themeDisplayNames, colorThemes } from '../lib/colorThemes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ColorThemeSelectorProps {
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  disabled?: boolean;
}

export default function ColorThemeSelector({
  selectedTheme,
  onThemeChange,
  disabled = false
}: ColorThemeSelectorProps) {
  const themes = Object.keys(colorThemes) as ColorTheme[];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Choose Color Theme
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {themes.map((theme) => {
          const colors = colorThemes[theme];
          const isSelected = selectedTheme === theme;
          
          return (
            <Button
              key={theme}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onThemeChange(theme)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-2 px-3 py-2 h-auto transition-all duration-200",
                isSelected && "ring-2 ring-primary/20"
              )}
              data-testid={`theme-button-${theme}`}
            >
              {/* Color preview dots */}
              <div className="flex gap-1">
                {colors.slice(0, 3).map((color, index) => (
                  <div
                    key={color.id}
                    className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    data-testid={`theme-color-${theme}-${index}`}
                  />
                ))}
              </div>
              
              <span className="text-xs font-medium">
                {themeDisplayNames[theme]}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}