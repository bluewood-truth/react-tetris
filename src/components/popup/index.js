import React from 'react';
import {GAME_STATE} from 'src/hooks/useGameState';
import {milliSecondToMMSSFF} from 'src/helpers/time';
import styles from './styles.css';

export const Popup = ({gameState, gameResult}) => {
  return (
    <div className={styles.popupWrapper}>
      {gameState === GAME_STATE.GAME_OVER && (
        <div className={styles.popup}>
          <div>GAME OVER</div>
          <div>PRESS R TO RETRY</div>
        </div>
      )}
      {gameState === GAME_STATE.PAUSE && (
        <div className={styles.popup}>
          <div>PAUSE</div>
          <div>PRESS P TO PLAY</div>
        </div>
      )}
      {gameState === GAME_STATE.FINISH && (
        <div className={styles.popup}>
          <div>FINISH!</div>
          <div>LINES: {gameResult.lines}</div>
          <div>SCORE: {gameResult.score}</div>
          <div>TIME: {milliSecondToMMSSFF(gameResult.time)}</div>
        </div>
      )}
    </div>
  );
};
