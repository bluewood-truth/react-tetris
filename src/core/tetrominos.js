export const tetrominos = {
  I: {
    name: 'I',
    cells: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 'cyan',
  },
  O: {
    name: 'O',
    cells: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    color: 'yellow',
  },
  J: {
    name: 'J',
    cells: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    color: 'blue',
  },
  L: {
    name: 'L',
    cells: [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    color: 'orange',
  },
  S: {
    name: 'S',
    cells: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: 'green',
  },
  T: {
    name: 'T',
    cells: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: 'purple',
  },
  Z: {
    name: 'Z',
    cells: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: 'red',
  },
};

export const getSevenBag = () => {
  const keys = Object.keys(tetrominos);
  const randomized = [];
  while (keys.length) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    randomized.push(keys[randomIndex]);
    keys.splice(randomIndex, 1);
  }

  return randomized;
};
