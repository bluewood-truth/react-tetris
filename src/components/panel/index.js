import React from 'react';
import styles from './styles.css';

export const Panel = ({label, value, children}) => {
  return (
    <div className={styles.panel}>
      {label && <span className={styles.label}>{label}</span>}
      {value && <span>{value}</span>}
      {children}
    </div>
  );
};

export const PanelGroup = ({children}) => {
  return <div className={styles.panelGroup}>{children}</div>;
};
