import React from 'react';
import {Row} from '../cell';
import styles from './styles.css';

export const Field = React.memo(({field}) => {
  return (
    <div className={styles.playfield}>
      <div className={styles.playfieldInner}>
        {field.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </div>
    </div>
  );
});

Field.displayName = 'Field';
