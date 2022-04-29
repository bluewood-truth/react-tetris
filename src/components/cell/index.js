import React from 'react';
import styles from './styles.css';

export const Cell = React.memo(({color, isEmpty, isLock}) => {
  return (
    <div
      className={styles.cell}
      style={isEmpty ? {opacity: 0} : {backgroundColor: color}}
      data-is-lock={isLock}
    ></div>
  );
});

Cell.displayName = 'Cell';

export const Row = React.memo(({row}) => {
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
});

Row.displayName = 'Row';