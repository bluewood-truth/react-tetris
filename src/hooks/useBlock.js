import {useCallback, useState} from 'react';
import {tetrominos} from 'src/core/tetrominos';

const INITIAL_BLOCK_POSITION = [19, 3];

export const useBlock = () => {
  const [block, updateBlock] = useState(null);

  const setNewBlock = useCallback((tetromino) => {
    updateBlock({
      ...tetrominos[tetromino],
      rotate: 0,
      position: INITIAL_BLOCK_POSITION,
    });
  }, []);

  return {block, updateBlock, setNewBlock};
};
