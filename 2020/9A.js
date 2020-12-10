function A(input) {
  const set = new Set();

  let res = 0;
  let arr = input.split('\n').map(a => Number(a));

  let i = 0;
  for (; i < 25; i++) {
    set.add(arr[i]);
  }

  for (; i < arr.length; i++) {
    const a = [...set];
    
    let flag = false;
    for (let j = 0; j < a.length; j++) {
      for (let k = 0; k < a.length; k++) {
        if (j == k) {
          continue;
        }

        if (a[k] + a[j] == arr[i]) {
          flag = true;
        }
      }
    }

    if (!flag) {
      return arr[i];
    }

    set.delete(arr[i - 25]);
    set.add(arr[i]);
  }

  return res;
}
