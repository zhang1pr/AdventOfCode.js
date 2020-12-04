function A(input) {
  let res = 0;
  const arr = input.split('\n').map(a => a.split(''));

  let temp = 0;

  for (let i = 0, j = 0; j < arr.length - 1; i++, temp++) {
    if (i == arr[0].length) {
      i = 0;
    }

    if (temp == 3) {
      temp = 0;
      j++;
     
      if (arr[j][i] == '#') {
        res++;
      }
    } 
  }

  return res;
}
