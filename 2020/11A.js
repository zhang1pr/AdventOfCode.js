function A(input) {
  const dir = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, 1], [1, -1], [1, 1], [-1, -1]];

  let res = 0;
  let arr = input.split('\n').map(a => a.split(''));  
  let newArr = [];
   
  let flag = true; 
  while (flag) {
    flag = false;

    newArr = arr.map(a => a.slice());

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] == '.') {
          continue;
        }

        let count = 0;
        for (const [x, y] of dir) {
          const nx = i + x; 
          const ny = j + y;

          if (0 <= nx && nx < arr.length && 0 <= ny && ny < arr[0].length) {
            if (arr[nx][ny] == '#') {
              count++;
            }
          }
        }

        if (arr[i][j] == 'L' && count == 0) {
          newArr[i][j] = '#';
          flag = true;
        }

        if (arr[i][j] == '#' && count >= 4) {
          newArr[i][j] = 'L';
          flag = true;
        }
      }
    }

    arr = newArr;
  }

  for (const array of newArr) {
    for (const item of array) {
      if (item == '#') {
        res++;
      }
    }
  }

  return res;
}
