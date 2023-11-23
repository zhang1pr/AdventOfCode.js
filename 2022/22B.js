const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const darr = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));
const gcd = (x, y) => (y == 0 ? x : gcd(y, x % y));

function B(input) {
  let map = new Map();
  let arr = readword(input);
  let str = arr.at(-1);
  arr.pop();

  let ins = 'X';
  for (let ch of str) {
    if (ch == 'L' || ch == 'R')
      ins += ' ';
    ins += ch;
  }
  ins = ins.split(' ');

  let R = arr.length, C = 0;
  for (let row of arr)
    C = Math.max(C, row.length);
  C++;
  for (let i = 0; i < arr.length; i++)
    arr[i] = arr[i].padEnd(C, ' ');

  let size = gcd(R - 1, C - 1);
  let x = 0, y = arr[0].indexOf('.');
  let d = 0;

  function wrapAround(x, y, d) {
    let str = chain(x, y, d);

    if (map.has(str))
      return map.get(str).split(',').map(a => +a);

    return goStraight(x, y, d);
  }

  function walk(x, y, d, steps) {
    while (steps) {
      steps--;
      let nx = x, ny = y, nd = d;
      [x, y, d] = wrapAround(x, y, d);

      if (arr[x][y] == '#')
        return [nx, ny, nd];
    }

    return [x, y, d];
  }

  let goStraight = (x, y, d) => [(x + darr[d][0] + R) % R, (y + darr[d][1] + C) % C, d];
  let chain = (...arr) => arr.join(',');
  let EDGELEFT = -1, EDGESTRAIGHT = 0, EDGERIGHT = 1;
  let edgeStack = [];
  let turnStack = [EDGERIGHT];
  let reverse = false, nx = x, ny = y, nd = 0;

  do {
    if (reverse) {
      for (let i = 0; i < size; i++) {
        let [prex, prey, pred] = edgeStack.pop();

        map.set(
          chain(prex, prey, (pred + 3) % 4),
          chain(nx, ny, (nd + 1) % 4)
        ).set(
          chain(nx, ny, (nd + 3) % 4),
          chain(prex, prey, (pred + 1) % 4)
        );

        [nx, ny, nd] = goStraight(nx, ny, nd);
      }
    } else {
      for (let i = 0; i < size; i++) {
        edgeStack.push([nx, ny, nd]);
        [nx, ny, nd] = goStraight(nx, ny, nd);
      }
    }

    let cur = arr[nx][ny];
    let [leftx, lefty] = goStraight(nx, ny, (nd + 3) % 4);
    let edgeTurn = EDGELEFT;

    if (arr[leftx][lefty] == ' ' && cur == ' ') {
      edgeTurn = EDGERIGHT;
    } else if (arr[leftx][lefty] == ' ' && cur != ' ') {
      edgeTurn = EDGESTRAIGHT;
    }

    if (reverse) {
      let lastUnmatchedTurn = turnStack.at(-1);

      if (lastUnmatchedTurn + edgeTurn == 1) {
        turnStack.pop();
        if (turnStack.length == 0) {
          turnStack.push(edgeTurn);
          reverse = false;
        }
      } else {
        turnStack.pop();
        turnStack.push(EDGESTRAIGHT);
        reverse = false;
      }
    } else {
      if (edgeTurn == EDGELEFT)
        reverse = true;
      else
        turnStack.push(edgeTurn);
    }

    if (edgeTurn == EDGERIGHT) {
      nd = (nd + 1) % 4;
      [nx, ny] = goStraight(nx, ny, (nd + 1) % 4);
    } else if (edgeTurn == EDGELEFT) {
      nd = (nd + 3) % 4;
      [nx, ny] = goStraight(nx, ny, nd);
    }
  } while (nx != x || ny != y || nd != d);

  for (let move of ins) {
    let steps = +move.slice(1), c = move[0];

    if (c == 'R')
      d = (d + 1) % 4;
    else if (c == 'L')
      d = (d + 3) % 4;

    [x, y, d] = walk(x, y, d, steps);
  }

  return (x + 1) * 1000 + (y + 1) * 4 + d;
}