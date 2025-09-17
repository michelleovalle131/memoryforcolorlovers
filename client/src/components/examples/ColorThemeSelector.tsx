import { useState } from 'react';
import ColorThemeSelector from '../ColorThemeSelector';
import { ColorTheme } from '../../types/game';

export default function ColorThemeSelectorExample() {
  //todo: remove mock functionality
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>('blues');

  const handleThemeChange = (theme: ColorTheme) => {
    console.log('Theme changed to:', theme);
    setSelectedTheme(theme);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-2xl">
        <ColorThemeSelector
          selectedTheme={selectedTheme}
          onThemeChange={handleThemeChange}
        />
      </div>
    </div>
  );
}