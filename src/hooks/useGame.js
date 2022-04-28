import {useCallback, useState} from 'react';

const scorePerLines = [0, 40, 100, 300, 1200];

export const useGame = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);

  const lineClearCallback = useCallback((lines) => {
    setScore((prev) => prev + scorePerLines[lines]);
    setLines((prev) => prev + lines);
  }, []);

  return {isPlaying, setPlaying, score, lines, lineClearCallback};
};
