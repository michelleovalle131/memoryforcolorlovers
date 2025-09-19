import { useState, useEffect } from 'react';

interface ColorSwatch {
  id: string;
  hex: string;
  name: string;
  baseHue: number;
  baseSaturation: number;
  baseLightness: number;
}

export default function ColorGrid() {
  const [swatches, setSwatches] = useState<ColorSwatch[]>([]);

  // Generate a comprehensive color palette with gradient rows
  const generateColorPalette = (): ColorSwatch[] => {
    const colors: ColorSwatch[] = [];
    let id = 0;

    // Define color families for each row (hue values)
    const colorFamilies = [
      { name: 'Red', hue: 0 },
      { name: 'Orange', hue: 30 },
      { name: 'Amber', hue: 45 },
      { name: 'Yellow', hue: 60 },
      { name: 'Lime', hue: 90 },
      { name: 'Green', hue: 120 },
      { name: 'Emerald', hue: 150 },
      { name: 'Teal', hue: 180 },
      { name: 'Cyan', hue: 195 },
      { name: 'Sky', hue: 210 },
      { name: 'Blue', hue: 240 },
      { name: 'Indigo', hue: 260 },
      { name: 'Violet', hue: 280 },
      { name: 'Purple', hue: 300 },
      { name: 'Fuchsia', hue: 320 },
      { name: 'Pink', hue: 340 },
      { name: 'Rose', hue: 350 },
      { name: 'Slate', hue: 220 },
      { name: 'Gray', hue: 0 },
      { name: 'Zinc', hue: 0 },
    ];

    // Generate 20 rows, each with 20 colors going from dark to light
    colorFamilies.forEach((family, rowIndex) => {
      for (let colIndex = 0; colIndex < 20; colIndex++) {
        // Calculate lightness: 950 (darkest) to 50 (lightest)
        // Map 0-19 to 95-5 (inverted for dark to light)
        const lightness = 95 - (colIndex * 4.5); // 95, 90.5, 86, 81.5, 77, 72.5, 68, 63.5, 59, 54.5, 50, 45.5, 41, 36.5, 32, 27.5, 23, 18.5, 14, 9.5
        
        // For gray/zinc/slate, use lower saturation
        const saturation = family.name === 'Gray' || family.name === 'Zinc' || family.name === 'Slate' ? 0 : 100;
        
        colors.push({
          id: `swatch-${id++}`,
          hex: `hsl(${family.hue}, ${saturation}%, ${lightness}%)`,
          name: `${family.name} ${950 - (colIndex * 50)}`,
          baseHue: family.hue,
          baseSaturation: saturation,
          baseLightness: lightness
        });
      }
    });

    return colors;
  };

  useEffect(() => {
    setSwatches(generateColorPalette());
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.05); 
          }
        }
        
        .twinkle-swatch:nth-child(3n) {
          animation: twinkle ease-in-out infinite;
          animation-duration: 3s;
          animation-delay: 0s;
        }
        
        .twinkle-swatch:nth-child(5n) {
          animation: twinkle ease-in-out infinite;
          animation-duration: 4s;
          animation-delay: 1s;
        }
        
        .twinkle-swatch:nth-child(7n) {
          animation: twinkle ease-in-out infinite;
          animation-duration: 5s;
          animation-delay: 2s;
        }
        
        .twinkle-swatch:nth-child(11n) {
          animation: twinkle ease-in-out infinite;
          animation-duration: 3.5s;
          animation-delay: 0.5s;
        }
        
        .twinkle-swatch:nth-child(13n) {
          animation: twinkle ease-in-out infinite;
          animation-duration: 4.5s;
          animation-delay: 1.5s;
        }
        
        .twinkle-swatch:nth-child(17n) {
          animation: twinkle ease-in-out infinite;
          animation-duration: 6s;
          animation-delay: 2.5s;
        }
        
        .twinkle-swatch:nth-child(19n) {
          animation: twinkle ease-in-out infinite;
          animation-duration: 3.8s;
          animation-delay: 0.8s;
        }
      `}</style>
      
      <div className="w-full h-screen overflow-hidden bg-stone-50 p-3">
        <div 
          className="grid gap-3 w-full h-full"
          style={{
            gridTemplateColumns: 'repeat(20, 60px)',
            gridAutoRows: '60px',
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          {swatches.map((swatch) => (
            <div
              key={swatch.id}
              className="twinkle-swatch cursor-pointer"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: swatch.hex,
                borderRadius: '0px'
              }}
              title={`${swatch.name} - ${swatch.hex}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}