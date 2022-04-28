import {useCallback, useEffect, useRef} from 'react';

const SEC_PER_FRAME = 1000 / 60;

export const useTimer = ({tick, isEnabled, initialValue = 0}) => {
  const timer = useRef(initialValue);

  const setTimer = useCallback(
    (dispatch) => {
      timer.current = dispatch(timer.current);
      if (tick) tick(timer.current);
    },
    [tick]
  );

  const resetTimer = useCallback(() => {
    setTimer(() => initialValue);
  }, [initialValue, setTimer]);

  useEffect(() => {
    if (!isEnabled) return;

    const id = setInterval(() => {
      console.log(timer.current);
      setTimer((prev) => prev + 1);
    }, SEC_PER_FRAME);

    return () => clearInterval(id);
  }, [isEnabled, setTimer]);

  return [resetTimer, setTimer];
};
