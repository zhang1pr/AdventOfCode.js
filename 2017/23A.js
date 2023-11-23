const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), res = 0;
  let arr = readword2d(input);

  for (let i = 0; i < arr.length;) {
    let [ins, a, b] = arr[i];
    let va = a, vb = b;

    if (a == +a) va = +a;
    else va = map.get(a) || 0;

    if (b == +b) vb = +b;
    else vb = map.get(b) || 0;

    if (ins == 'set') {
      map.set(a, vb);
      i++;
    } else if (ins == 'sub') {
      map.set(a, va - vb);
      i++;
    } else if (ins == 'mul') {
      map.set(a, va * vb);
      res++;
      i++;
    } else if (ins == 'jnz') {
      if (va != 0)
        i += vb;
      else
        i++;
    }
  }

  return res;
}