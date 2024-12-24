const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = readword(input);

  function getMoves(board) {
    let pos = new Map();
    for (let r = 0; r < board.length; r++)
      for (let c = 0; c < board[r].length; c++)
        if (board[r][c] != 'X')
          pos.set(board[r][c], [r, c]);

    let seqs = new Map();
    for (let [u, [r1, c1]] of pos)
      for (let [v, [r2, c2]] of pos)
        if (u == v)
          seqs.set(u + ',' + v, 'A');
        else {
          let [dr, dc] = [r2 - r1, c2 - c1];
          let chr = dr < 0 ? '^' : 'v', chc = dc < 0 ? '<' : '>';
          dr = dr / Math.abs(dr), dc = dc / Math.abs(dc);

          seqs.set(u + ',' + v, DFS(r1, c1, r2, c2, dr, dc, chr, chc, board));
        }

    return seqs;
  }

  function DFS(r1, c1, r2, c2, dr, dc, chr, chc, board) {
    if (r1 == r2 && c1 == c2)
      return ['A'];

    let res = [];
    if (r1 != r2 && board[r1 + dr][c1] != 'X')
      res = DFS(r1 + dr, c1, r2, c2, dr, dc, chr, chc, board).map(a => chr + a);

    if (c1 != c2 && board[r1][c1 + dc] != 'X')
      res.push(...DFS(r1, c1 + dc, r2, c2, dr, dc, chr, chc, board).map(a => chc + a));

    return res;
  }

  let numMap = getMoves(['789', '456', '123', 'X0A']);
  let dirMap = getMoves(['X^A', '<v>']);

  let cntMap = new Map();
  for (let [k, v] of dirMap)
    cntMap.set(k, v[0].length);

  for (let move of arr) {
    let nmoves = numerical('A' + move, numMap);

    let min = Infinity;

    for (let nmove of nmoves)
      min = Math.min(min, directional(nmove, 2));

    res += min * parseInt(move);
  }

  function numerical(string, map) {
    let str = [''];

    for (let i = 0; i < string.length - 1; i++) {
      let a = string[i], b = string[i + 1];
      let nstr = [];

      for (let x of str)
        for (let y of map.get(a + ',' + b))
          nstr.push(x + y);

      str = nstr;
    }

    return str;
  }

  function directional(move, d) {
    if (map.has(move + ',' + d)) {
      return map.get(move + ',' + d);
    }

    let res = 0;
    let nmove = 'A' + move;

    if (d == 1) {
      for (let i = 0; i < nmove.length - 1; i++) {
        let x = nmove[i], y = nmove[i + 1];
        res += cntMap.get(x + ',' + y);
      }
    } else {
      for (let i = 0; i < nmove.length - 1; i++) {
        let x = nmove[i], y = nmove[i + 1];

        let min = Infinity;
        for (let part of dirMap.get(x + ',' + y)) {
          min = Math.min(min, directional(part, d - 1));
        }

        res += min;
      }
    }

    map.set(move + ',' + d, res);
    return res;
  }

  return res;
}

console.log(solve(input));