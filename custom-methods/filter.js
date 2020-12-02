const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const filter = (arr, cb) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    cb(arr[i], i, arr) ? result.push(arr[i]) : null;
  }

  return result;
};

console.log(
  'original --->',
  sample.filter(num => num > 5)
);
console.log(
  'custom --->',
  filter(sample, num => num > 5)
);
