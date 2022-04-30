import React from 'react';
import {Block} from './block';
import {Field} from './field';
import styles from './styles.css';

export const Stage = ({field, block}) => {
  return (
    <div className={styles.stage}>
      <Field field={field} />
      <Block block={block} />
    </div>
  );
};
