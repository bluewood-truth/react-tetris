import React from 'react';
import {Cell} from '../../cell';
import styles from './styles.css';

export const Block = ({block}) => {
  if (!block) return null;

  const position = [block.position[1] * -32, block.position[0] * -32];

  return (
    <div className={styles.blockWrapper}>
      <div
        className={styles.block}
        style={{
          transform: `translate(${position[0]}px, ${position[1]}px)`,
        }}
      >
        {block.cells.map((row, i) => (
          <div key={i} className={styles.blockRow}>
            {row.map((cell, j) => (
              <Cell
                key={j}
                color={block.color}
                isEmpty={cell === 0}
                isLock={false}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
