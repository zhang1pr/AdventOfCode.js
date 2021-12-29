const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), calcmap = new Map(), ansmap = new Map(), q = [];

  let arr = readword(input).map((a, idx) => {
    let cur = a.split(' -> '), [vars, ans] = cur, op = null, dep = [], num = [], all = [];

    for (let name of vars.split(' ')) {
      if ('A' <= name[0] && name[0] <= 'Z') op = name;
      else {
        if (Number.isInteger(+name)) {
          num.push(+name);
          all.push(+name);
        } else {
          dep.push(name);
          all.push(name);
        }
      }
    }

    if (dep.length == 0) {
      q.push(ans);
      ansmap.set(ans, num[0]); 
    }

    for (let name of dep) {
      if (!map.has(name)) map.set(name, []);
      map.get(name).push(ans);
    }
    
    calcmap.set(ans, [dep.length, idx]);
    return [op, all, ans];
  });

  while (q.length) {
    let nq = [];

    for (let cur of q) {
      for (let ans of (map.get(cur) || [])) {
        let [len, idx] = calcmap.get(ans);
        len--;
        
        if (len != 0) {
          calcmap.set(ans, [len, idx]);
          continue;
        } else {
          let [op, dep, ans] = arr[idx]; 
          let [a, b] = dep;
          let val;
          if (ansmap.has(a)) a = ansmap.get(a);
          if (ansmap.has(b)) b = ansmap.get(b);

          if (op == 'AND') {
            val = a & b;
          } else if (op == 'OR') {
            val = a | b;
          } else if (op == 'NOT') {
            val = ~a;
          } else if (op == 'LSHIFT') {
            val = a << b;
          } else if (op == 'RSHIFT') {
            val = a >> b;
          } else {
            val = a;
          }

          if (val < 0) val += 65536;
          if (ans == 'a') return val;

          nq.push(ans)
          ansmap.set(ans, val);
        }
      }
    }

    q = nq;
  }
}
