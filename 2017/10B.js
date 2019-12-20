function A(input) {
  let list = [...input.split('').map(char => char.charCodeAt(0)), 17, 31, 73, 47, 23];
  let skipSize = 0;
  let position = 0;
  let count = 64;
  const array = [...Array(256).keys()];

  while (count > 0) {
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

    count--;
  }

  let result = '';
  for (let i = 0; i < array.length; i += 16) {
    const string = (array.slice(i, i + 16).reduce((prev, curr) => prev ^ curr, 0)).toString(16);
    result += string.length === 1 ? '0' + string : string;
  }

  return result;
}
