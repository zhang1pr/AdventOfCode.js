const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = readword(input);

  for (let line of arr) {
    if (line[0] == '{') {
      let [x, m, a, s] = readnum(line);
      f(x, m, a, s, 'in');
    } else if (line != '') {
      let [a, b] = line.split('{');
      b = b.slice(0, -1);
      map.set(a, b);
    }
  }

  function f(x, m, a, s, rule) {
    let conds = map.get(rule).split(',');

    for (let cond of conds) {
      if (cond.includes(':')) {
        let [c, d] = cond.split(':');

        if (eval(c)) {
          if (d == 'A') {
            res += x + m + a + s;
            return;
          } else if (d == 'R') {
            return;
          } else {
            f(x, m, a, s, d);
            return;
          }
        }
      } else if (cond == 'A') {
        res += x + m + a + s;
        return;
      } else if (cond == 'R') {
        return;
      } else {
        f(x, m, a, s, cond);
        return;
      }
    }
  }

  return res;
}

console.log(solve(input));