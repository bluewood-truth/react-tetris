import React from 'react';
import {Cell} from 'src/components/cell';
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
