const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const map = (arr, cb) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(cb(arr[i], i, arr));
  }

  return result;
};

console.log(
  'original --->',
  sample.map(num => num + 10)
);
console.log(
  'custom --->',
  map(sample, num => num + 10)
);
