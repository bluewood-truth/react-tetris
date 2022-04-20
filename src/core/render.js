import {deepCopy, sumArray} from 'src/helpers/object';

export const FIELD_WIDTH = 10;
export const FIELD_HEIGHT = 20;

export const createPlayfield = () => {
  return Array(FIELD_HEIGHT)
    .fill(null)
    .map(() =>
      Array(FIELD_WIDTH)
        .fill(null)
        .map(() => createCell())
    );
};

export const createCell = (color, isEmpty = true) => {
  return {color, isEmpty};
};

export const renderBlock = (field, block) => {
  field = deepCopy(field);
  block.cells.forEach((cellRow, row) => {
    cellRow.map((cell, col) => {
      if (cell === 0) return;

      const [fieldRow, fieldCol] = sumArray([row, col], block.position);

      if (fieldRow >= FIELD_HEIGHT || fieldCol >= FIELD_WIDTH) return;
      field[fieldRow][fieldCol] = createCell(block.color, false);
    });
  });
  return field;
};
