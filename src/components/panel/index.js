import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.css';

export const Panel = React.memo(({label, value, children}) => {
  return (
    <div className={styles.panel}>
      {label && <span className={styles.label}>{label}</span>}
      {value && <span>{value}</span>}
      {children}
    </div>
  );
});

Panel.displayName = 'Panel';

export const PanelGroup = ({children}) => {
  return <div className={styles.panelGroup}>{children}</div>;
};

export const TimePanel = React.memo(({enabled, reset}) => {
  const {mmss} = useTime(enabled, reset);
  return <Panel label='TIME' value={mmss} />;
});

TimePanel.displayName = 'TimePanel';

const useTime = (isEnabled, isReset) => {
  const milliSec = useRef(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    setSec(0);
    milliSec.current = 0;
  }, [isReset]);

  useEffect(() => {
    if (!isEnabled) return;
    const timer = setInterval(() => {
      milliSec.current = milliSec.current + 10;
      if (milliSec.current % 1000 === 0) {
        setSec((prev) => prev + 1);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [isEnabled]);

  const mmss = `
    ${String(Math.round(sec / 60)).padStart(2, '0')}:${String(
    sec % 60
  ).padStart(2, '0')}
  `;

  const mmssfff = `
    ${mmss}.${String(milliSec / 10).padStart(3, '0')}
  `;

  return {mmss, mmssfff};
};
