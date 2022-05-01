import {useCallback, useEffect, useMemo, useState} from 'react';

const SCORE_PER_LINES = [0, 40, 100, 300, 1200];

export const GAME_STATE = {
  NONE: 'NONE',
  PLAYING: 'PLAYING',
  PAUSE: 'PAUSE',
  GAME_OVER: 'GAME_OVER',
  FINISH: 'FINISH',
};

export const GAME_MODE = {
  SPRINT: 'SPRINT',
  MARATHON: 'MARATHON',
  FREE: 'FREE',
};

const FINISH_CONDITION = {
  [GAME_MODE.SPRINT]: ({lines}) => lines >= 40,
  [GAME_MODE.MARATHON]: ({lines}) => lines >= 100,
  [GAME_MODE.FREE]: () => false,
};

const DROP_DELAY = [48, 30, 22, 16, 12, 9, 7, 5, 4, 3];
const MIN_LOCK_DELAY = 15;

export const useGameState = (gameMode, clearLineCount) => {
  const [gameState, setGameState] = useState(GAME_STATE.NONE);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [dropDelay, setDropDelay] = useState(DROP_DELAY[0]);

  const lockDelay = useMemo(
    () => Math.max(dropDelay * 1.25, MIN_LOCK_DELAY),
    [dropDelay]
  );

  const level = useMemo(() => Math.floor(lines / 10), [lines]);

  useEffect(() => {
    if (clearLineCount > 0) {
      setScore((prev) => prev + SCORE_PER_LINES[clearLineCount] * (level + 1));
      setLines((prev) => prev + clearLineCount);
    }
  }, [clearLineCount, level]);

  useEffect(() => {
    if (FINISH_CONDITION[gameMode]({lines, score})) {
      setGameState(GAME_STATE.FINISH);
    }
  }, [gameMode, lines, score]);

  useEffect(() => {
    if (gameMode === GAME_MODE.MARATHON) {
      setDropDelay(DROP_DELAY[level]);
    }
  }, [gameMode, level]);

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

  const reset = () => {
    setGameState(GAME_STATE.NONE);
  };

  return {
    gameState,
    score,
    lines,
    start,
    pause,
    gameOver,
    reset,
    dropDelay,
    lockDelay,
  };
};
