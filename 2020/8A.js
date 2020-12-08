function A(input) {
  const map = new Map();
  const set = new Set();

  let i = 0;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');  
  
    map.set(i, parts);
    i++;
  });

  i = 0;
  let acc = 0;

  while (true) {
    let [ins, val] = map.get(i);
    val = Number(val);

    let flag = false;
    
    if (ins == 'acc') {
      acc += val;
    } else if (ins == 'jmp') {
      flag = true;
    }
    
    if (set.has(i)) {    
      if (ins == 'acc') {
        return acc - val;
      } else {
        return acc;
      }
    }
    
    set.add(i);

    if (flag) {
      i += val;
    } else {
      i++;
    }
  }
}
