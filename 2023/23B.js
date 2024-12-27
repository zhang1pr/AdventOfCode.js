const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  function DFS1(step, last, r, c, i) {
    if (!isIn(r, c, R, C) || arr[r][c] == '#') return;

    let cnt = 0;
    for (let [dr, dc] of darr) {
      let nr = r + dr, nc = c + dc;

      if (isIn(nr, nc, R, C) && arr[nr][nc] != '#')
        cnt++;
    }

    if (step > 0 && (cnt > 2 || r < 1 || r >= R - 1)) {
      let str = r + ',' + c;
      if (!nodes.includes(str))
        nodes.push(str);

      dist[i].set(nodes.indexOf(str), step);
      return;
    }

    if (last != 0 && r < arr.length - 1)
      DFS1(step + 1, 2, r + 1, c, i);

    if (last != 1)
      DFS1(step + 1, 3, r, c + 1, i);

    if (last != 2 && r > 0)
      DFS1(step + 1, 0, r - 1, c, i);

    if (last != 3)
      DFS1(step + 1, 1, r, c - 1, i);
  }

  function DFS2(steps, node, prev) {
    if (node == 1) {
      if (steps > res) {
        path = prev;
        res = steps;
      }

      return;
    }

    prev.push(node);

    for (let [target, v] of dist[node]) {
      if (prev.includes(+target)) continue;

      DFS2(steps + v, +target, prev.slice());
    }
  }

  let nodes = ['0,1', (arr.length - 1) + ',' + (arr[0].length - 2)];
  let dist = [], path = [];

  for (let i = 0; i < nodes.length; i++) {
    dist[i] = new Map();
    let node = nodes[i].split(',').map(a => +a);

    DFS1(0, -1, node[0], node[1], i);
  }

  DFS2(0, 0, []);

  return res;
}

console.log(solve(input));