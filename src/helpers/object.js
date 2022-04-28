export const deepCopy = (target) => {
  if (Array.isArray(target)) {
    return target.map(deepCopy);
  } else if (typeof target === 'object') {
    const newObj = {};
    Object.keys(target).forEach((key) => {
      newObj[key] = deepCopy(target[key]);
    });
    return newObj;
  } else {
    return target;
  }
};

export const sumArray = (a, b) => {
  if (a.length !== b.length) {
    throw new Error(`Two array's length is different.`);
  }

  return a.map((v, i) => v + b[i]);
};

export const rotateMatrix = (matrix) => {
  if (matrix.length !== matrix[0].length) {
    throw new Error(`Only square matrix can rotate.`);
  }

  matrix = deepCopy(matrix);
  const n = matrix.length - 1;

  matrix.forEach((row, r) => {
    row.forEach((_, c) => {
      if (c < r || c >= n - r) return; // 열이 스왑 범위를 벗어났을 때
      if (r >= n / 2) return; // 행이 행렬의 절반 이상일 때

      // 시계방향으로 네 모서리를 한꺼번에 스왑
      [matrix[r][c], matrix[c][n - r], matrix[n - r][n - c], matrix[n - c][r]] =
        [
          matrix[n - c][r],
          matrix[r][c],
          matrix[c][n - r],
          matrix[n - r][n - c],
        ];
    });
  });

  return matrix;
};
