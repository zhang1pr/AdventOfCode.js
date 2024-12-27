const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [-1, 0]], ['D', [1, 0]], ['L', [0, -1]], ['R', [0, 1]]]);
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = Infinity;
  let [w1, w2] = readword(input).map(a => a.split(','));

  let r = 0, c = 0, step = 0;
  for (let i = 0; i < w1.length; i++) {
    let dir = w1[i][0], cnt = +w1[i].slice(1);
    let [dr, dc] = dmap.get(dir);

    for (let n = 1; n <= cnt; n++) {
      r += dr;
      c += dc;
      step++;
      map.set(r + ',' + c, step);
    }
  }

  r = 0, c = 0, step = 0;
  for (let i = 0; i < w2.length; i++) {
    let dir = w2[i][0], cnt = +w2[i].slice(1);
    let [dr, dc] = dmap.get(dir);

    for (let n = 1; n <= cnt; n++) {
      r += dr;
      c += dc;
      step++;

      if (map.has(r + ',' + c))
        res = Math.min(res, step + map.get(r + ',' + c));
    }
  }

  return res;
}

console.log(solve(input));