const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//forEach doesn't mutate the original array
//and doesn't return anything
const forEach = (arr, cb) => {
  for (let i = 0; i < arr.length; i++) {
    cb(arr[i], i, arr);
  }
};

console.log('original --->', sample.forEach(console.log));
console.log('custom --->', forEach(sample, console.log));
