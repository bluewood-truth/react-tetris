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
