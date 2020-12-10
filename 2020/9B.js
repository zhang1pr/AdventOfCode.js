function B(input) {
  const target = 18272118;
  let sum = 0;
  let arr = input.split('\n').map(a => Number(a));

  let i = 0;
  let j = 0;
  while (i < arr.length) {
    if (sum < target) {
      while (j < arr.length && sum < target) {
        sum += arr[j];

        if (sum == target) {
          break;
        }

        j++;
      }
    } else {
      sum -= arr[i];

      if (sum == target) {
        break;
      }

      i++;
    }
  }

  let max = -Infinity;
  let min = Infinity;
  for (let k = i + 1; k < j; k++) {
    max = Math.max(arr[k], max);
    min = Math.min(arr[k], min);
  }

  return max + min;
}
