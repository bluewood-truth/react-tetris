import {useCallback, useState, useRef} from 'react';
import {tetrominos, getSevenBag} from 'src/core/tetrominos';

const INITIAL_BLOCK_POSITION = [19, 3];

export const useBlock = () => {
  const [block, setBlock] = useState(null);
  const {nextBlocks, resetNextBlocks, popNextBlock} = useNextBlocks();

  const setNewBlock = useCallback(() => {
    const tetromino = popNextBlock();
    setBlock({
      ...tetrominos[tetromino],
      rotate: 0,
      position: INITIAL_BLOCK_POSITION,
    });
  }, [popNextBlock]);

  return {block, setBlock, setNewBlock, nextBlocks, resetNextBlocks};
};

export const useNextBlocks = () => {
  const nextBlocks = useRef([]);

  const supplySevenBag = () => {
    nextBlocks.current = [...nextBlocks.current, ...getSevenBag()];
  };

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
