const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let set = new Set(), res = 0;
  let charMap = new Map([['1,0', '|LJ'], ['-1,0', '|F7'], ['0,-1', '-LF'], ['0,1', '-7J']]);
  let pipeMap = new Map([
    ['F', [[0, 1], [1, 0]]],
    ['L', [[0, 1], [-1, 0]]],
    ['J', [[0, -1], [-1, 0]]],
    ['7', [[0, -1], [1, 0]]],
    ['|', [[1, 0], [-1, 0]]],
    ['-', [[0, 1], [0, -1]]]
  ]);

  let arr = readword(input).map(a => [...a]);
  let R = arr.length, C = arr[0].length;
  let dirsOfS = [];
  let sr, sc;

  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (arr[i][j] == 'S')
        sr = i, sc = j, BFS(i, j);

  function BFS(i, j) {
    set.add(i + ',' + j);
    let q = [[i, j, [0, 0]]];

    while (q.length) {
      let nq = [];

      for (let [r, c, [dr, dc]] of q) {
        let ch = arr[r][c];
        let dirs = [[dr, dc]];

        if (ch == 'S') {
          dirs = darr;
        } else if ('FLJ7'.includes(ch)) {
          let [a, b] = pipeMap.get(ch);
          if (r == i && c == j) dirs = [a, b];
          else if (dr == 0) dirs = [b];
          else dirs = [a];
        }

        for (let [dr, dc] of dirs) {
          let nr = r + dr, nc = c + dc;
          let s = nr + ',' + nc;
          let dirs = dr + ',' + dc;

          if (isIn(nr, nc, R, C) && charMap.get(dirs).includes(arr[nr][nc]) && !set.has(s)) {
            if (ch == 'S') dirsOfS.push(dirs);

            set.add(s);
            nq.push([nr, nc, [dr, dc]]);
          }
        }
      }

      q = nq;
    }
  }

  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      if (!set.has(i + ',' + j))
        arr[i][j] = '.';

  dirsOfS.sort();
  let ds = dirsOfS.join('#');

  for (let [k, v] of pipeMap) {
    v = v.map(a => a.join(','));
    v.sort();
    let dv = v.join('#');

    if (ds == dv)
      arr[sr][sc] = k;
  }

  for (let i = 0; i < R; i++) {
    let cnt = 0;
    for (let j = 0; j < C; j++) {
      if ('|F7'.includes(arr[i][j])) cnt++;
      else if (arr[i][j] == '.' && cnt % 2 == 1) res++;
    }
  }

  return res;
}