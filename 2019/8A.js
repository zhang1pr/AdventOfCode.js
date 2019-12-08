function A(input) {
  const array = [];
  let min = Infinity;
  let minOneCount;
  let minTwoCount;

  for (let i = 0; i < input.length; i++) {
    array.push(input.slice(0, 25*6));
    input = input.slice(25*6);
  }

  for (const layer of array) {
    let zeroCount = 0;
    let oneCount = 0;
    let twoCount = 0;

    for (const number of layer) {
      if (number === '0') {
        zeroCount += 1;
      }
      if (number === '1') {
        oneCount += 1;
      }
      if (number === '2') {
        twoCount += 1;
      }
    }

    if (zeroCount < min) {
      min = zeroCount;
      minOneCount = oneCount;
      minTwoCount = twoCount;
    }
  }

  return minOneCount * minTwoCount;
}
