function B(input) {
  let res = 1;

  const arr = input.split('\n').map(a => a.split(''));
  const request = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
   
  for (const [a, b] of request) {
    res *= findTree(a, b, arr);
  }

  return res;
}

function findTree(a, b, arr) {
  let res = 0;
  let temp = 0;
  
  for (let i = 0, j = 0; j < arr.length - 1; i++, temp++) {
    if (i == arr[0].length) {
      i = 0;
    }

    if (temp == a) {
      temp = 0;
      j += b;
   
      if (j > arr.length - 1) {
        break;
      }

      if (arr[j][i] == '#') {
        res++;
      }
    } 
  }

  return res;
}
