import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IntroPageProps {
  onStartGame: (buttonColor: string) => void;
}

export default function IntroPage({ onStartGame }: IntroPageProps) {
  const [circleColors, setCircleColors] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonColor, setButtonColor] = useState<string>('');

  const generateCircleColors = () => {
    const colorMap: { [key: string]: string } = {
      'red-400': '#f87171',
      'red-500': '#ef4444',
      'red-600': '#dc2626',
      'orange-400': '#fb923c',
      'orange-500': '#f97316',
      'orange-600': '#ea580c',
      'amber-400': '#fbbf24',
      'amber-500': '#f59e0b',
      'amber-600': '#d97706',
      'yellow-400': '#facc15',
      'yellow-500': '#eab308',
      'yellow-600': '#ca8a04',
      'lime-400': '#a3e635',
      'lime-500': '#84cc16',
      'lime-600': '#65a30d',
      'green-400': '#4ade80',
      'green-500': '#22c55e',
      'green-600': '#16a34a',
      'emerald-400': '#34d399',
      'emerald-500': '#10b981',
      'emerald-600': '#059669',
      'teal-400': '#2dd4bf',
      'teal-500': '#14b8a6',
      'teal-600': '#0d9488',
      'cyan-400': '#22d3ee',
      'cyan-500': '#06b6d4',
      'cyan-600': '#0891b2',
      'sky-400': '#38bdf8',
      'sky-500': '#0ea5e9',
      'sky-600': '#0284c7',
      'blue-400': '#60a5fa',
      'blue-500': '#3b82f6',
      'blue-600': '#2563eb',
      'indigo-400': '#818cf8',
      'indigo-500': '#6366f1',
      'indigo-600': '#4f46e5',
      'violet-400': '#a78bfa',
      'violet-500': '#8b5cf6',
      'violet-600': '#7c3aed',
      'purple-400': '#c084fc',
      'purple-500': '#a855f7',
      'purple-600': '#9333ea',
      'fuchsia-400': '#e879f9',
      'fuchsia-500': '#d946ef',
      'fuchsia-600': '#c026d3',
      'pink-400': '#f472b6',
      'pink-500': '#ec4899',
      'pink-600': '#db2777',
      'rose-400': '#fb7185',
      'rose-500': '#f43f5e',
      'rose-600': '#e11d48'
    };
    
    const colorKeys = Object.keys(colorMap);
    const colors: string[] = [];
    
    for (let i = 0; i < 18; i++) { // 6 circles per side = 18 total (left, right, center)
      const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      colors.push(colorMap[randomColorKey]);
    }
    
    return colors;
  };

  const generateButtonColor = () => {
    const buttonColorMap: { [key: string]: string } = {
      'lime-700': '#365314',
      'green-700': '#15803d',
      'emerald-700': '#047857',
      'teal-700': '#0f766e',
      'cyan-700': '#0e7490',
      'sky-700': '#0369a1',
      'blue-700': '#1d4ed8',
      'indigo-700': '#4338ca',
      'violet-700': '#6d28d9',
      'purple-700': '#7c2d12',
      'fuchsia-700': '#a21caf',
      'pink-700': '#be185d',
      'rose-700': '#be123c'
    };
    
    const colorKeys = Object.keys(buttonColorMap);
    const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return buttonColorMap[randomColorKey];
  };

  useEffect(() => {
    const colors = generateCircleColors();
    const buttonBgColor = generateButtonColor();
    console.log('Generated colors:', colors); // Debug log
    setCircleColors(colors);
    setButtonColor(buttonBgColor);
    
    // Start animation immediately
    setIsAnimating(true);
  }, []);
  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(15px, -20px); }
          50% { transform: translate(-10px, 25px); }
          75% { transform: translate(20px, -15px); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(-25px, 15px); }
          50% { transform: translate(20px, -30px); }
          75% { transform: translate(-15px, 20px); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(30px, 10px); }
          50% { transform: translate(-20px, -25px); }
          75% { transform: translate(10px, 30px); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(-15px, -30px); }
          50% { transform: translate(25px, 15px); }
          75% { transform: translate(-20px, -10px); }
        }
        
        @keyframes float5 {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(20px, 25px); }
          50% { transform: translate(-30px, -15px); }
          75% { transform: translate(15px, -20px); }
        }
        
        @keyframes float6 {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(-30px, -20px); }
          50% { transform: translate(15px, 30px); }
          75% { transform: translate(-25px, 15px); }
        }
        
        .float-1 { animation: float1 4s ease-in-out infinite; }
        .float-2 { animation: float2 5s ease-in-out infinite; }
        .float-3 { animation: float3 3.5s ease-in-out infinite; }
        .float-4 { animation: float4 4.5s ease-in-out infinite; }
        .float-5 { animation: float5 6s ease-in-out infinite; }
        .float-6 { animation: float6 3.8s ease-in-out infinite; }
      `}</style>
      <div className="min-h-screen flex items-center justify-center px-4 relative bg-slate-50">
      {/* Left Concentric Circle Pattern */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
        {Array.from({ length: 6 }).map((_, index) => {
          const sizePercentage = (15 + (index * 15)) * 1.5; // Starting at 22.5% of 100vh, increasing by 22.5% each (50% increase)
          const borderColor = circleColors[index] || '#3b82f6'; // Use actual hex color
          const floatClass = isAnimating ? `float-${(index % 6) + 1}` : '';
          return (
            <div
              key={`left-circle-${index}`}
              className={`absolute rounded-full border ${floatClass}`}
              style={{
                width: `calc(100vh * ${sizePercentage / 100})`,
                height: `calc(100vh * ${sizePercentage / 100})`,
                borderWidth: '1px',
                borderColor: borderColor,
                fill: 'none'
              }}
            />
          );
        })}
      </div>

      {/* Right Concentric Circle Pattern */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
        {Array.from({ length: 6 }).map((_, index) => {
          const sizePercentage = (15 + (index * 15)) * 1.5; // Starting at 22.5% of 100vh, increasing by 22.5% each (50% increase)
          const borderColor = circleColors[index + 6] || '#3b82f6'; // Use colors 6-11 for right side
          const floatClass = isAnimating ? `float-${(index % 6) + 1}` : '';
          return (
            <div
              key={`right-circle-${index}`}
              className={`absolute rounded-full border ${floatClass}`}
              style={{
                width: `calc(100vh * ${sizePercentage / 100})`,
                height: `calc(100vh * ${sizePercentage / 100})`,
                borderWidth: '1px',
                borderColor: borderColor,
                fill: 'none'
              }}
            />
          );
        })}
      </div>

      {/* Center Concentric Circle Pattern */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {Array.from({ length: 6 }).map((_, index) => {
          const sizePercentage = (15 + (index * 15)) * 1.5; // Starting at 22.5% of 100vh, increasing by 22.5% each (50% increase)
          const borderColor = circleColors[index + 12] || '#3b82f6'; // Use colors 12-17 for center
          const floatClass = isAnimating ? `float-${(index % 6) + 1}` : '';
          console.log(`Center circle ${index}:`, borderColor, 'Available colors:', circleColors.length); // Debug log
          return (
            <div
              key={`center-circle-${index}`}
              className={`absolute rounded-full border ${floatClass}`}
              style={{
                width: `calc(100vh * ${sizePercentage / 100})`,
                height: `calc(100vh * ${sizePercentage / 100})`,
                borderWidth: '1px',
                borderColor: borderColor,
                fill: 'none'
              }}
            />
          );
        })}
      </div>

      <div className="text-center space-y-8 bg-stone-50 p-12 relative z-10" style={{ 
        borderRadius: '100%', 
        width: '500px', 
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Game Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            <div className="text-2xl font-mono font-light uppercase">MEMORY FOR</div>
            <div>Color Lovers</div>
          </h1>
          <p className="font-mono text-muted-foreground leading-relaxed" style={{ fontSize: '15px' }}>
            Match game celebrating the beauty of color, drawing inspiration from the paint samples I grew up with alongside my painter dad.
          </p>
        </div>

        {/* Start Game Button */}
        <div className="pt-4">
          <Button
            onClick={() => onStartGame(buttonColor)}
            size="lg"
            className="gap-2 px-8 py-3 text-lg font-mono font-medium text-white uppercase"
            style={{ 
              backgroundColor: buttonColor || '#1d4ed8',
              border: 'none'
            }}
            data-testid="start-game-button"
          >
            <Palette className="w-5 h-5" />
            START GAME
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}