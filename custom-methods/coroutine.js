const promise1 = () => {
  return new Promise(r => {
    setTimeout(() => {
      r('promise1');
    }, 1500);
  });
}

const promise2 = () => {
  return new Promise(r => {
    setTimeout(() => {
      r('promise2');
    }, 1500);
  });
}

function* gen() {
  console.log(1);

  const v1 = yield promise1();

  console.log(2, v1);

  const v2 = yield promise2();

  console.log(3, v2);

  return 4;
}

const coroutine = generator => {
  //Getting iterator from passed generator function
  const i = generator();

  //Using recursion, becuase we don't know the number of 'yields' in gen function
  const recursion = input => {
    const current = i.next(input); //Getting the value of current iteration

    return current.done //If done is true then just return the value
      ? current.value
      : current.value.then(output => recursion(output)); //Otherwise, pass the output for the next 'next'
  };

  return recursion();
};

coroutine(gen);
