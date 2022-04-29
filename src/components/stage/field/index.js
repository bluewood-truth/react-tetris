import React from 'react';
import {Row} from '../../cell';
import styles from './styles.css';

export const Field = React.memo(({field}) => {
  return (
    <div className={styles.playfield}>
      {field.map((row, i) => (
        <Row key={i} row={row} />
      ))}
    </div>
  );
});

Field.displayName = 'Field';
