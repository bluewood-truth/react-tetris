import React, {useState} from 'react';
import {useAudio} from 'src/hooks/useAudio';
import styles from './styles.css';

export const Title = ({setGameMode}) => {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.title}>
      <h1 className={styles.titleLabel}>
        <span style={{color: 'red'}}>T</span>
        <span style={{color: 'orange'}}>E</span>
        <span style={{color: 'yellow'}}>T</span>
        <span style={{color: 'green'}}>R</span>
        <span style={{color: 'blue'}}>I</span>
        <span style={{color: 'purple'}}>S</span>
      </h1>
      {step === 1 && (
        <div className={styles.menu}>
          <MenuButton onClick={() => setStep(2)} label='START' />
        </div>
      )}
      {step === 2 && (
        <div className={styles.menu}>
          <MenuButton
            onClick={() => {
              setGameMode('40LINES');
            }}
            label='40-LINES SPRINT'
          />
          <MenuButton
            onClick={() => {
              setGameMode('MARATHON');
            }}
            label='MARATHON'
          />
        </div>
      )}
    </div>
  );
};

const MenuButton = ({onClick, label}) => {
  const [playClickSound] = useAudio('/se_click.wav');

  return (
    <button
      className={styles.button}
      onClick={() => {
        playClickSound();
        onClick();
      }}
    >
      {label}
    </button>
  );
};
