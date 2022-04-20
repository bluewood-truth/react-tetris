import React from 'react';
import {Cell} from '../cell';
import styles from './styles.css';

export const Playfield = ({field}) => {
  return (
    <div className={styles.playfield}>
      <div className={styles.playfieldInner}>
        {field.map((row, i) => (
          <Row key={i}>
            {row.map((cell, j) => (
              <Cell key={j} color={cell.color} isEmpty={cell.isEmpty} />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
};

export const Row = ({children}) => {
  return <div className={styles.row}>{children}</div>;
};
