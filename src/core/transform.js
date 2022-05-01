import {deepCopy, rotateMatrix, sumArray} from 'src/helpers/object';
import {FIELD_HEIGHT, FIELD_WIDTH} from './field';

export const TRANSFORM_STATE = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  ERROR: 'ERROR',
};

export const DIRECTION = {LEFT: 'LEFT', RIGHT: 'RIGHT', BOTTOM: 'BOTTOM'};

const DIRECTION_MOVE = {LEFT: [0, -1], RIGHT: [0, 1], BOTTOM: [-1, 0]};

const WALL_KICK_CHECKLIST = {
  I: {
    0: [
      [0, -2],
      [0, 1],
      [-1, -2],
      [2, 1],
    ],
    1: [
      [0, -1],
      [0, 2],
      [2, -1],
      [-1, 2],
    ],
    2: [
      [0, 2],
      [0, -1],
      [1, 2],
      [-2, -1],
    ],
    3: [
      [0, 1],
      [0, -2],
      [-2, 1],
      [1, -2],
    ],
  },
  JLTSZ: {
    0: [
      [0, -1],
      [1, -1],
      [-2, 0],
      [-2, -1],
    ],
    1: [
      [0, 1],
      [-1, 1],
      [2, 0],
      [2, 1],
    ],
    2: [
      [0, 1],
      [1, 1],
      [-2, 0],
      [-2, 1],
    ],
    3: [
      [0, -1],
      [-1, -1],
      [2, 0],
      [2, -1],
    ],
  },
};

export const transform = {
  rotate(block, field) {
    const newBlock = deepCopy(block);
    newBlock.cells = rotateMatrix(newBlock.cells);
    newBlock.rotate = (block.rotate + 1) % 4;

    let wallKickCheckList = null;
    if (block.name === 'I') {
      wallKickCheckList = WALL_KICK_CHECKLIST.I[block.rotate];
    } else if (block.name !== 'O') {
      wallKickCheckList = WALL_KICK_CHECKLIST.JLTSZ[block.rotate];
    }

    if (!checkCollision(newBlock, field)) {
      return {block: newBlock, state: TRANSFORM_STATE.SUCCESS};
    }

    let test;
    if (
      wallKickCheckList &&
      wallKickCheckList.some((currTest) => {
        test = currTest;
        return !checkCollision(newBlock, field, currTest);
      })
    ) {
      return {
        block: {...newBlock, position: sumArray(newBlock.position, test)},
        state: TRANSFORM_STATE.SUCCESS,
      };
    }

    return {message: 'collision', state: TRANSFORM_STATE.FAIL};
  },

  move(block, field, direction) {
    const newBlock = deepCopy(block);
    newBlock.position = sumArray(block.position, DIRECTION_MOVE[direction]);

    const isCollision = checkCollision(newBlock, field);
    if (!isCollision) {
      return {block: newBlock, state: TRANSFORM_STATE.SUCCESS};
    }

    return {message: 'collision', state: TRANSFORM_STATE.FAIL};
  },
};

const checkCollision = (block, field, test) => {
  let isCollision = false;
  const blockPosition = test ? sumArray(block.position, test) : block.position;

  block.cells.forEach((cellRow, row) => {
    if (isCollision) return;

    cellRow.forEach((cell, col) => {
      if (isCollision || cell === 0) return;

      const [fieldRow, fieldCol] = sumArray([row, col], blockPosition);

      if (fieldRow < 0 || fieldCol < 0 || fieldCol >= FIELD_WIDTH) {
        isCollision = true;
      } else if (fieldRow >= FIELD_HEIGHT) {
        isCollision = false;
      } else {
        isCollision = !field[fieldRow][fieldCol].isEmpty;
      }
    });
  });

  return isCollision;
};
