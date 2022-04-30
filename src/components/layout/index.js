import React from 'react';
import styles from './styles.css';

export const Layout = React.forwardRef(({children, onKeyDown, onBlur}, ref) => {
  return (
    <div
      className={styles.layout}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      ref={ref}
    >
      {children}
    </div>
  );
});

Layout.displayName = 'Layout';
