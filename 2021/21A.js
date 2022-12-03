const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/-?\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let a1 = 0, a2 = 0, f = true, t = 1, time = 0;
  let [t1, t2] = readword(input).map(a => +a.split(': ')[1]);

  while (a1 < 1000 && a2 < 1000) {
    let cur = 3;

    if (f) {
      while (cur) {
        cur--;
        t1 += t;
        t1 = t1 % 10;
        if (t1 == 0) t1 = 10;
        time++;
        t++;
        if (t == 101) t = 1;
      }
      a1 += t1;
    } else {
      while (cur) {
        cur--;
        t2 += t;
        t2 = t2 % 10;
        if (t2 == 0) t2 = 10;

        time++;
        t++;
        if (t == 101) t = 1;
      }
      a2 += t2;
    }

    f = !f;
  }
  
  if (a1 >= 1000) res = a2; else res = a1;
  return res * time;
}
