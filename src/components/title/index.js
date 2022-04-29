import React, {useState} from 'react';
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
          <button className={styles.button} onClick={() => setStep(2)}>
            START
          </button>
        </div>
      )}
      {step === 2 && (
        <div className={styles.menu}>
          <button
            className={styles.button}
            onClick={() => {
              setGameMode('40LINES');
            }}
          >
            40-LINES SPRINT
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setGameMode('MARATHON');
            }}
          >
            MARATHON
          </button>
        </div>
      )}
    </div>
  );
};
