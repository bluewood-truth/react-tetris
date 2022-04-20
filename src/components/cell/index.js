import React from 'react';
import styles from './styles.css';

export const Cell = ({color, isEmpty}) => {
  return (
    <div
      className={styles.cell}
      style={isEmpty ? {opacity: 0} : {backgroundColor: color}}
    ></div>
  );
};
