import React from 'react';
import styles from './styles.css';

export const Layout = React.forwardRef(({children, onKeyDown}, ref) => {
  return (
    <div className={styles.layout} tabIndex={0} onKeyDown={onKeyDown} ref={ref}>
      {children}
    </div>
  );
});

Layout.displayName = 'Layout';
