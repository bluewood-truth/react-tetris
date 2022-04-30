import React from 'react';
import {tetrominos} from 'src/core/tetrominos';
import {Cell} from '../cell';
import styles from './styles.css';

export const Tetromino = React.memo(
  ({name, isLock, ignoreEmptyLines, style, tetromino}) => {
    tetromino = tetromino || tetrominos[name];

    return (
      <div style={style} className={styles.tetromino}>
        {tetromino.cells.map((row, i) => {
          if (ignoreEmptyLines && row.every((cell) => cell === 0)) return;
          return (
            <div key={i} className={styles.row}>
              {row.map((cell, j) => (
                <Cell
                  key={j}
                  color={tetromino.color}
                  isEmpty={cell === 0}
                  isLock={isLock}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
);

Tetromino.displayName = 'Tetromino';
