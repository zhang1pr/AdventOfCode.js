function A(input) {
  const list = input.split(',').map(Number);
  let skipSize = 0;
  let position = 0;
  const array = [...Array(256).keys()];

  for (const item of list) {
    const start = position;
    let end = position + item;

    let i = start;
    let j = end;
    let temp;
    let iTemp;
    let jTemp;

    while (i < j) {
      iTemp = i % array.length;
      jTemp = (j - 1) % array.length;
      temp = array[iTemp];
      array[iTemp] = array[jTemp];
      array[jTemp] = temp;

      i++;
      j--;
    }

    position = (end + skipSize) % array.length;
    skipSize++;
  }

  return array[0] * array[1];
}
