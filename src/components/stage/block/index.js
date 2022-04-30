import React from 'react';
import { Tetromino } from 'src/components/tetromino';
import styles from './styles.css';

export const Block = ({block}) => {
  if (!block) return null;

  const position = [block.position[1] * -32, block.position[0] * -32];

  return (
    <div className={styles.blockWrapper}>
      <Tetromino
        tetromino={block}
        style={{
          transform: `translate(${position[0]}px, ${position[1]}px)`,
        }}
      />
    </div>
  );
};
