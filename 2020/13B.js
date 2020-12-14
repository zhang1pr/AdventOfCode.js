function B(input) {
  const arr = input.split('\n')[1].split(',').map((a, idx) => [a, idx]).filter(a => a[0] != 'x');
 
  let pro = 1;
  let res = 1;

  for (const [id, remainder] of arr) {
    while ((res + remainder) % id != 0) {
      res += pro;
    }

    pro *= id;
  }

  return res;
}
