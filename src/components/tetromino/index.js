import React from 'react';
import {tetrominos} from 'src/core/tetrominos';
import {Cell} from '../cell';
import styles from './styles.css';

export const Tetromino = ({name}) => {
  const tetromino = tetrominos[name];

  return (
    <div className={styles.tetromino}>
      {tetromino.cells.map((row, i) => {
        if (row.every((cell) => cell === 0)) return;
        return (
          <div key={i} className={styles.row}>
            {row.map((cell, j) => (
              <Cell
                key={j}
                color={cell === 1 && tetromino.color}
                isEmpty={cell === 0}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
