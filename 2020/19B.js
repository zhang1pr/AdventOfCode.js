function B(input) {
  const map = new Map();
  const dp = new Map();

  let res = 0;
  const arr = [];
  let flag = true;

  input.split('\n').forEach(line => {
    if (flag && line) {
      const parts = line.split(': ');

      if (parts[1].includes('a')) {
        map.set(parts[0], 'a');
      } else if (parts[1].includes('b')) {
        map.set(parts[0], 'b');
      } else {
        map.set(parts[0], parts[1].split(' | '));
      }
    } else if (!line) {
      flag = false;
    } else {
      arr.push(line);
    }
  });

  function DFS(index) {
    if (dp.has(index)) {
      return dp.get(index);
    }

    const get = map.get(index);

    if (get == 'a' || get == 'b') {
      dp.set(index, get);
      return [get];
    }
 
    const res = [];

    for (const message of get) {
      const [a, b]= message.split(' ');

      const resA = a ? DFS(a) : [''];
      const resB = b ? DFS(b) : [''];

      for (const A of resA) {
        for (const B of resB) {
          res.push(A + B);
        }
      }
    }

    dp.set(index, res);

    return res;
  }

  const arrA = DFS('42');
  const arrB = DFS('31');
  
  for (const str of arr) {
    if (str.length % 8 != 0) {
      continue;
    } 

    let i = str.length;
    let countA = 0;
    let countB = 0;

    for (; i >= 8; i -= 8) {
      if (arrB.includes(str.slice(i - 8, i))) {
        countB++;
      } else {
        break;
      }
    }

    for (; i >= 8; i -= 8) {
      if (arrA.includes(str.slice(i - 8, i))) {
        countA++;
      } else {
        break;
      }
    }

    if (i == 0 && countA > countB && countB > 0) {
      res++;
    }
  }

  return res;
}
