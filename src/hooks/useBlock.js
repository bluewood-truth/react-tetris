import {useCallback, useState} from 'react';
import {tetrominos} from 'src/core/tetrominos';

export const useBlock = () => {
  const [block, setBlock] = useState(null);

  const setNewBlock = useCallback((tetromino) => {
    console.log(tetromino);
    setBlock({
      ...tetrominos[tetromino],
      rotate: 0,
      position: [19, 3],
    });
  }, []);

  return {block, setBlock, setNewBlock};
};
