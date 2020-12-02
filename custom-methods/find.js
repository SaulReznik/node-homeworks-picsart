const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const find = (arr, cb) => {
  for (let i = 0; i < arr.length; i++) {
    if (cb(arr[i], i, arr)) {
      return arr[i];
    }
  }
};

console.log(
  'original --->',
  sample.find(num => num > 5)
);
console.log(
  'custom --->',
  find(sample, num => num > 5)
);
