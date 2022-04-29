import {useCallback, useEffect, useState} from 'react';

const SCORE_PER_LINES = [0, 40, 100, 300, 1200];
export const GAME_STATE = {
  NONE: 'NONE',
  PLAYING: 'PLAYING',
  PAUSE: 'PAUSE',
  GAME_OVER: 'GAME_OVER',
  FINISH: 'FINISH',
};

export const useGame = (gameMode, clearLineCount) => {
  const [gameState, setGameState] = useState(GAME_STATE.NONE);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    if (clearLineCount > 0) {
      setScore((prev) => prev + SCORE_PER_LINES[clearLineCount]);
      setLines((prev) => prev + clearLineCount);
    }
  }, [clearLineCount]);

  useEffect(() => {
    if (gameMode === '40LINES' && lines >= 40) {
      setGameState(GAME_STATE.FINISH);
    }
  }, [gameMode, lines]);

  const start = useCallback(() => {
    setGameState(GAME_STATE.PLAYING);
    setScore(0);
    setLines(0);
  }, []);

  const pause = () => {
    setGameState((prev) => {
      if (prev === GAME_STATE.PLAYING) return GAME_STATE.PAUSE;
      else if (prev === GAME_STATE.PAUSE) return GAME_STATE.PLAYING;
      return GAME_STATE.NONE;
    });
  };

  const gameOver = () => {
    setGameState(GAME_STATE.GAME_OVER);
  };

  const finish = () => {
    setGameState(GAME_STATE.FINISH);
  };

  return {
    gameState,
    score,
    lines,
    start,
    pause,
    gameOver,
    finish,
  };
};
