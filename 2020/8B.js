function B(input) {
  const map = new Map();

  let count = 0;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');  
  
    map.set(count, parts);
    count++;
  });

  for (let i = 0; i < count; i++) {
    let [ins, val] = map.get(i);

    if (ins == 'nop') {
      ins = 'jmp';
    } else if (ins == 'jmp') {
      ins = 'nop';
    } else {
      continue;
    }

    const newMap = new Map(map).set(i, [ins, val]);

    let index = 0;
    let acc = 0;
    const set = new Set();

    while (index < count) {
      let [ins, val] = newMap.get(index);
      
      val = Number(val);

      let flag = false;
      
      if (ins == 'acc') {
        acc += val;
      } else if (ins == 'jmp') {
        flag = true;
      }
      
      if (set.has(index)) {    
        break;
      }
      
      set.add(index);

      if (flag) {
        index += val;
      } else {
        index++;
      }
    }

    if (index >= count) {
      return acc;
    }
  }
}
