import React from 'react';
import {Cell} from '../cell';
import styles from './styles.css';

export const Field = React.forwardRef(({field, onKeyDown}, ref) => {
  return (
    <div
      className={styles.playfield}
      tabIndex={0}
      onKeyDown={onKeyDown}
      ref={ref}
    >
      <div className={styles.playfieldInner}>
        {field.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </div>
    </div>
  );
});

Field.displayName = 'Field';

export const Row = ({row}) => {
  return (
    <div className={styles.row}>
      {row.map((cell, j) => (
        <Cell
          key={j}
          color={cell.color}
          isEmpty={cell.isEmpty}
          isLock={cell.isLock}
        />
      ))}
    </div>
  );
};
