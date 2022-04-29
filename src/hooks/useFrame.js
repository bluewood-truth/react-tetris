import {useCallback, useEffect, useRef} from 'react';

const MS_PER_FRAME = 1000 / 60;

export const useFrame = ({tick, enabled, initialValue = 0}) => {
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
    if (!enabled) return;

    const id = setInterval(() => {
      setFrame((prev) => prev + 1);
    }, MS_PER_FRAME);

    return () => clearInterval(id);
  }, [enabled, setFrame]);

  return {resetFrame, setFrame, frame: frame.current};
};
