import {useCallback, useState} from 'react';

const SCORE_PER_LINES = [0, 40, 100, 300, 1200];
export const GAME_STATE = {
  NONE: 'NONE',
  PLAYING: 'PLAYING',
  PAUSE: 'PAUSE',
  GAME_OVER: 'GAME_OVER',
  FINISH: 'FINISH',
};

export const useGame = () => {
  const [gameState, setGameState] = useState(GAME_STATE.NONE);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);

  const lineClearCallback = useCallback((lines) => {
    setScore((prev) => prev + SCORE_PER_LINES[lines]);
    setLines((prev) => prev + lines);
  }, []);

  const setStart = useCallback(() => {
    setGameState(GAME_STATE.PLAYING);
  }, []);

  const setPause = () => {
    setGameState((prev) => {
      if (prev === GAME_STATE.PLAYING) return GAME_STATE.PAUSE;
      else if (prev === GAME_STATE.PAUSE) return GAME_STATE.PLAYING;
      return GAME_STATE.NONE;
    });
  };

  const setGameOver = () => {
    setGameState(GAME_STATE.GAME_OVER);
  };

  const setFinish = () => {
    setGameState(GAME_STATE.FINISH);
  };

  return {
    score,
    lines,
    lineClearCallback,
    gameState,
    setStart,
    setPause,
    setGameOver,
    setFinish,
  };
};
