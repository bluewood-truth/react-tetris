import {useState} from 'react';
import {ACTION, action, DIRECTION} from 'src/core/action';
import {tetrominos} from 'src/core/tetrominos';

export const useBlock = (field, initialTetromino) => {
  const [block, setBlock] = useState({
    ...tetrominos[initialTetromino],
    rotate: 0,
    position: [20, 3],
  });

  const setNewBlock = (tetromino) => {
    setBlock({
      ...tetrominos[tetromino],
      rotate: 0,
      position: [20, 3],
    });
  };

  const drop = () => {
    action(
      ACTION.DROP,
      {
        success: (block) => {
          console.log('drop');
          setBlock(block);
        },
        fail: () => {
          console.log('collision');
        },
      },
      block,
      field
    );
  };

  const rotate = () => {
    action(
      ACTION.ROTATE,
      {
        success: (block) => {
          console.log('rotate');
          setBlock(block);
        },
        fail: () => {
          console.log('collision');
        },
      },
      block,
      field
    );
  };

  const move = (direction) => {
    action(
      ACTION.MOVE,
      {
        success: (block) => {
          console.log('move right');
          setBlock(block);
        },
        fail: () => {
          console.log('collision');
        },
      },
      block,
      field,
      DIRECTION[direction]
    );
  };

  const hardDrop = () => {
    action(
      ACTION.HARD_DROP,
      {
        success: (block) => {
          console.log('hard drop');
          setBlock(block);
        },
        fail: () => {
          console.log('collision');
        },
      },
      block,
      field
    );
  };

  return {block, setNewBlock, drop, rotate, move, hardDrop};
};
