import {useCallback, useEffect, useRef} from 'react';

export const MS_PER_FRAME = 1000 / 60;

export const useFrame = ({tick, isEnabled, initialValue = 0}) => {
  const frame = useRef(initialValue);

  const setFrame = useCallback(
    (dispatch) => {
      frame.current = dispatch(frame.current);
      if (tick) tick(frame.current);
    },
    [tick]
  );

  const resetFrame = useCallback(() => {
    setFrame(() => initialValue);
  }, [initialValue, setFrame]);

  useEffect(() => {
    if (!isEnabled) return;

    const id = setInterval(() => {
      console.log(frame.current);
      setFrame((prev) => prev + 1);
    }, MS_PER_FRAME);

    return () => clearInterval(id);
  }, [isEnabled, setFrame]);

  return {resetFrame, setFrame, frame: frame.current};
};
