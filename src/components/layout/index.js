import React from 'react';
import styles from './styles.css';

export const Layout = ({children}) => {
  return <div className={styles.layout}>{children}</div>;
};
