import { useState } from 'react';
import MemoryGame from '../components/MemoryGame';
import IntroPage from '../components/IntroPage';

export default function Home() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState<string>('');

  const handleStartGame = (color: string) => {
    setButtonColor(color);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <IntroPage onStartGame={handleStartGame} />;
  }

  return <MemoryGame buttonColor={buttonColor} />;
}