import React from 'react';
import styles from './styles.css';

export const Playfield = ({children}) => {
  return (
    <div className={styles.playfield}>
      <div className={styles.playfieldInner}>{children}</div>
    </div>
  );
};
