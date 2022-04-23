import {deepCopy, sumArray} from 'src/helpers/object';
import {FIELD_HEIGHT, FIELD_WIDTH} from './render';

export const ACTION = {
  DROP: 'DROP',
  ROTATE: 'ROTATE',
  MOVE: 'MOVE',
  HARD_DROP: 'HARD_DROP',
};
export const DIRECTION = {LEFT: [0, -1], RIGHT: [0, 1], DOWN: [-1, 0]};

export const action = (actionType, callback, block, field, direction) => {
  let newBlock = null;
  switch (actionType) {
    case ACTION.DROP:
      newBlock = drop(block);
      break;
    case ACTION.ROTATE:
      newBlock = rotate(block);
      break;
    case ACTION.MOVE:
      newBlock = move(block, direction);
      break;
    case ACTION.HARD_DROP: {
      let tempNewBlock = block;
      while (!checkCollision(drop(tempNewBlock), field)) {
        newBlock = drop(tempNewBlock);
      }
      break;
    }
    default:
      console.warn('Invalid action!');
      return block;
  }

  const isCollision = checkCollision(newBlock, field);
  if (isCollision) {
    if (callback.fail) callback.fail(block);
    return;
  }

  if (callback.success) callback.success(newBlock);
};

const drop = (block) => {
  const newBlock = deepCopy(block);

  newBlock.position = sumArray(newBlock.position, DIRECTION.DOWN);

  return newBlock;
};

const rotate = (block) => {
  const newBlock = deepCopy(block);
  block.cells.forEach((cellRow, row) => {
    cellRow.forEach((cell, col) => {
      let [newRow, newCol] = [col, row];
      newCol = cellRow.length - 1 - newCol;
      newBlock.cells[newRow][newCol] = cell;
    });
  });
  newBlock.rotate = (block.rotate + 1) % 4;

  return newBlock;
};

const move = (tetromino, direction) => {
  const newBlock = deepCopy(tetromino);
  newBlock.position = sumArray(tetromino.position, direction);
  return newBlock;
};

const checkCollision = (block, field) => {
  let isCollision = false;

  console.log(block);

  block.cells.forEach((cellRow, row) => {
    if (isCollision) return;

    cellRow.forEach((cell, col) => {
      if (isCollision || cell === 0) return;

      const [fieldRow, fieldCol] = sumArray([row, col], block.position);

      if (fieldRow < 0 || fieldCol < 0 || fieldCol >= FIELD_WIDTH) {
        isCollision = true;
      } else if (fieldRow >= FIELD_HEIGHT) {
        isCollision = false;
      } else {
        isCollision = cell === 1 && !field[fieldRow][fieldCol].isEmpty;
      }
    });
  });

  return isCollision;
};
