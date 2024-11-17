const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let t = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;
  let q = [];

  let steps = 26501365;
  let goals = [];

  function mod(x, y) {
    x %= y;

    if (x < 0) x += y;
    return x;
  }

  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (arr[i][j] == 'S')
        q.push([i, j]), arr[i][j] = '.';

  while (t < steps) {
    t++;
    let vis = new Set();

    let nq = [];

    for (let [r, c] of q) {
      for (let [dr, dc] of darr) {
        let nr = r + dr, nc = c + dc, str = nr + ',' + nc;
        let nnr = mod(nr, R), nnc = mod(nc, C);

        if (arr[nnr][nnc] != '#' && !vis.has(str))
          vis.add(str), nq.push([nr, nc]);
      }
    }

    q = nq;

    if (t % R == steps % R)
      goals[Math.floor(t / R)] = q.length;

    if (goals[0] && goals[1] && goals[2]) break;
  }

  let [a, b, c] = goals;

  let aa = (c + a - 2 * b) / 2;
  let bb = b - a - aa;
  let cc = a;
  let times = Math.floor(steps / R);

  return aa * times ** 2 + bb * times + cc;
}

console.log(B(input));