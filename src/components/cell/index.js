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
