const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = input;
  let str = `####

  .#.
  ###
  .#.
  
  ..#
  ..#
  ###
  
  #
  #
  #
  #
  
  ##
  ##
  `.split('\n');
  let type = [], pattern = [];
  for (let line of str) {
    line = line.trim();
    if (line) {
      pattern.push(line);
    } else {
      type.push(pattern);
      pattern = [];
    }
  }

  let line = Array(7).fill('-'), empty = Array(7).fill('.');
  let graph = [line];
  let i = 0, cur, row, block, columnL, columnR, R, C, ncolumnL, ncolumnR;

  let hash = Array(5).fill('');
  let idx = 0, moves = '', nblock;

  while (i < 1000000000000) {
    let ch = arr[idx];
    moves += ch;

    idx = (idx + 1) % input.length;
    if (cur == null) {
      cur = type[i % 5];
      moves = '';
      R = cur.length, C = cur[0].length;
      row = graph.length + 3;
      columnL = 2, columnR = 2 + C - 1;

      block = [...Array(R)].map(() => Array(7).fill('.'));
      for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
          block[r][columnL + c] = cur[r][c];
    }

    while (graph[row + R - 1] == null)
      graph.push(empty.slice());

    if (ch == '<') {
      ncolumnL = Math.max(0, columnL - 1);
      ncolumnR = ncolumnL + C - 1;
    } else {
      ncolumnR = Math.min(6, columnR + 1);
      ncolumnL = ncolumnR - C + 1;
    }

    nblock = [...Array(R)].map(() => Array(7).fill('.'));
    for (let r = 0; r < R; r++)
      for (let c = 0; c < C; c++)
        nblock[r][ncolumnL + c] = cur[r][c];

    let canMoveLR = true;
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < 7; c++) {
        if (graph[r + row][c] == '#' && nblock[R - r - 1][c] == '#') {
          canMoveLR = false;
          break;
        }
      }

      if (!canMoveLR) break;
    }

    if (canMoveLR) {
      block = nblock;
      columnL = ncolumnL;
      columnR = ncolumnR;
    }

    let canMoveD = true;
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < 7; c++) {
        if (graph[r + row - 1][c] == '#' && block[R - r - 1][c] == '#') {
          canMoveD = false;
          break;
        }
      }

      if (!canMoveD) break;
    }

    if (canMoveD && row > 1) {
      row--;
    } else {
      for (let r = 0; r < R; r++)
        for (let c = 0; c < 7; c++)
          if (graph[r + row][c] == '#' || block[R - r - 1][c] == '#')
            graph[r + row][c] = '#';

      i++;
      cur = null;

      while (graph.at(-1).every(a => a == '.'))
        graph.pop();

      hash[i % 5] = (i % 5) + ',' + moves + ',' + graph.slice(row).join('');
      let str = '';

      for (let j = 0; j < 5; j++) {
        str += hash[(i + j) % 5];
      }

      if (map.has(str) && res == 0) {
        let [preI, preHeight] = map.get(str);
        let diff = i - preI;
        let times = Math.floor((1000000000000 - 1 - i) / diff);
        i += times * diff;
        res = times * (graph.length - preHeight);
      }

      map.set(str, [i, graph.length]);
    }
  }

  return graph.length - 1 + res;
}

console.log(solve(input));