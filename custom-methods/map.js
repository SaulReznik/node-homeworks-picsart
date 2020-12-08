const bluebird = require('bluebird');

const arr = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

const map = (arr, callback, options = {}) => {
  //set the default value of concurrency
  //so it'll work exactly like regular Promise.all
  //resolving all promises in queue
  let concurrency = options.concurrency || Infinity;

  let index = 0;
  const result = [];
  const pendingPromisesArr = [];

  //resolving every promise in the queue
  const wrappedCallback = () => {
    if (index >= arr.length) return null;
    const i = index++;

    return callback(arr[i], i).then(resolved => {
      result[i] = resolved;
      return wrappedCallback();
    });
  };

  //checking concurency to not iterate more then remaining elements in arr
  while (concurrency-- > 0) {
    const pendingPromise = wrappedCallback();
    if (pendingPromise) pendingPromisesArr.push(pendingPromise);
    else break;
  }

  //returning with Promise.all to resolve all promises
  return Promise.all(pendingPromisesArr).then(() => result);
};

(async () => {
  const res = await bluebird.map(arr, item => item, { concurrency: 2 });
  const res1 = await map(arr, item => item, { concurrency: 2 });
  console.log(res, res1);
})();
