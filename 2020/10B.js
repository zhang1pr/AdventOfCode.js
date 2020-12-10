function B(input) {
  const set = new Set().add(1);

  input.split('\n').forEach(num => {
    set.add(Number(num));
  });

  const max = Math.max(...set);
   
  let res1 = 1;
  let res2 = 1;
  let res3 = 0;
  
  let i = 2;
  while (i <= max) {
    let temp = res1;

    if (set.has(i)) {
      res1 = temp + res2 + res3;
    } else {
      res1 = 0; 
    }

    res3 = res2;
    res2 = temp;
    i++;
  }

  return res1;
}
