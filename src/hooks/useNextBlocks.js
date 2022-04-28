import {useCallback, useRef} from 'react';
import {getSevenBag} from 'src/core/tetrominos';

export const useNextBlocks = () => {
  const nextBlocks = useRef([]);

  const supplySevenBag = () => {
    nextBlocks.current = [...nextBlocks.current, ...getSevenBag()];
  }

  const resetNextBlocks = useCallback(() => {
    nextBlocks.current = [...getSevenBag()];
  }, []);

  const popNextBlock = useCallback(() => {
    const tetromino = nextBlocks.current.shift();
    if (nextBlocks.current.length < 7) {
      supplySevenBag();
    }
    return tetromino;
  }, []);

  return {nextBlocks, resetNextBlocks, popNextBlock};
};