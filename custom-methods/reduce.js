const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const reduce = (arr, cb, initialValue = 0) => {
  let result = initialValue;

  for (let i = 0; i < arr.length; i++) {
    result = cb(result, arr[i], i, arr);
  }

  return result;
};

console.log(
  'original --->',
  sample.reduce((prev, curr) => prev + curr)
);
console.log(
  'custom --->',
  reduce(sample, (prev, curr) => prev + curr)
);
