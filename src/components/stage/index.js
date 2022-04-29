import React from 'react';
import {milliSecondToMMSSFF} from 'src/helpers/time';
import {GAME_STATE} from 'src/hooks/useGame';

import {Block} from './block';
import {Field} from './field';
import styles from './styles.css';

export const Stage = ({field, block, gameState, gameResult}) => {
  return (
    <div className={styles.stage}>
      <Field field={field} />
      <Block block={block} />
      <div className={styles.popupWrapper}>
        {gameState === GAME_STATE.GAME_OVER && (
          <div className={styles.popup}>
            <div>GAME OVER</div>
            <div>PRESS R TO RETRY</div>
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
    </div>
  );
};
