import {deepCopy, rotateMatrix, sumArray} from 'src/helpers/object';
import {FIELD_HEIGHT, FIELD_WIDTH} from './field';

export const TRANSFORM_STATE = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  ERROR: 'ERROR',
};

export const DIRECTION = {LEFT: 'LEFT', RIGHT: 'RIGHT', BOTTOM: 'BOTTOM'};

const DIRECTION_MOVE = {LEFT: [0, 1], RIGHT: [0, -1], BOTTOM: [-1, 0]};

export const transform = {
  rotate(block, field) {
    const newBlock = deepCopy(block);
    newBlock.cells = rotateMatrix(newBlock.cells);
    newBlock.rotate = (block.rotate + 1) % 4;

    return this.response(newBlock, field);
  },

  move(block, field, direction) {
    const newBlock = deepCopy(block);
    newBlock.position = sumArray(block.position, DIRECTION_MOVE[direction]);

    return this.response(newBlock, field);
  },

  response(newBlock, field) {
    const isCollision = checkCollision(newBlock, field);
    if (isCollision) {
      return {message: 'collision', state: TRANSFORM_STATE.FAIL};
    }

    return {block: newBlock, state: TRANSFORM_STATE.SUCCESS};
  },
};

const checkCollision = (block, field) => {
  let isCollision = false;

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
