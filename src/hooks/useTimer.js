import {useCallback, useRef} from 'react';

export const useTimer = (callback, initialValue = 0) => {
  const timer = useRef(initialValue);

  const setTimer = useCallback(
    (dispatch) => {
      timer.current = dispatch(timer.current);
      if (callback) callback(timer.current);
    },
    [callback]
  );

  const resetTimer = useCallback(() => {
    timer.current = initialValue;
    if (callback) callback(timer.current);
  }, [callback, initialValue]);

  return [setTimer, resetTimer];
};
