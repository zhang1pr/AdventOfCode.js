const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map();
  let a1 = 0, a2 = 0;
  let [t1, t2] = readword(input).map(a => +a.split(': ')[1]);
  let dices = [1, 2, 3];

  function DFS(f, t1, t2, a1, a2) {
    let str = [...arguments].join(',');

    if (map.has(str)) return map.get(str);
    let arr = [0, 0];

    if (a1 >= 21 || a2 >= 21) {
      if (a1 >= 21) arr = [1, 0];
      else arr = [0, 1];
    } else {
      if (f) {
        for (let a of dices) {
          for (let b of dices) {
            for (let c of dices) {
              let d = a + b + c;
              let ct1 = (t1 + d) % 10;
              ct1 = ct1 == 0 ? 10 : ct1;

              let [p1, p2] = DFS(!f, ct1, t2, a1 + ct1, a2);
              arr[0] += p1;
              arr[1] += p2;
            }
          }
        }
      } else {
        for (let a of dices) {
          for (let b of dices) {
            for (let c of dices) {
              let d = a + b + c;
              let ct2 = (t2 + d) % 10;
              ct2 = ct2 == 0 ? 10 : ct2;

              let [p1, p2] = DFS(!f, t1, ct2, a1, a2 + ct2);
              arr[0] += p1;
              arr[1] += p2;
            }
          }
        }
      }
    }

    map.set(str, arr);
    return arr;
  }

  return Math.max(...DFS(true, t1, t2, a1, a2, 0));
}