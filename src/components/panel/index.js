import React, {useEffect, useRef, useState} from 'react';
import {GAME_STATE} from 'src/hooks/useGameState';
import {secondToMMSS} from 'src/helpers/time';
import styles from './styles.css';

export const Panel = React.memo(({label, value, align = 'right', children}) => {
  return (
    <div className={styles.panel} style={{alignItems: align}}>
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

export const TimePanel = React.memo(({gameState, setTime}) => {
  const {sec} = useTime(gameState, setTime);
  return <Panel label='TIME' value={secondToMMSS(sec)} />;
});

TimePanel.displayName = 'TimePanel';

const useTime = (gameState, setTime) => {
  const milliSec = useRef(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (gameState === GAME_STATE.FINISH || gameState === GAME_STATE.GAME_OVER) {
      setTime(milliSec.current);
    }

    if (gameState === GAME_STATE.NONE) {
      setSec(0);
      milliSec.current = 0;
    }
  }, [gameState, setTime]);

  useEffect(() => {
    if (gameState !== GAME_STATE.PLAYING) return;
    const timer = setInterval(() => {
      milliSec.current = milliSec.current + 10;
      if (milliSec.current % 1000 === 0) {
        setSec((prev) => prev + 1);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [gameState]);

  return {sec};
};
