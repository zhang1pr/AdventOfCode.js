const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword2d(input);
  let root = new Map();

  let cur = root;
  for (let [a,b,c] of arr) {
    if (a == '$') {
      if (b == 'cd') {
        if (c == '/') {
          cur = root;
        } else if (c == '..') {
          cur = cur.get('par');
        } else {
          cur = cur.get(c);
        }
      }
    } else {
      if (a != 'dir') {
        cur.set(b, +a);
      } else {
        cur.set(b, new Map().set('par', cur));
      }
    }   
  }

  function DFS(node) {
    if (Number.isInteger(node)) return node;

    let total = 0;
    for (let [key, child] of node) {
      if (key == 'par') continue;

      let val = DFS(child);

      if (val <= 100000 && !Number.isInteger(child)) {
        res += val;
      }

      total += val;
    }

    return total;
  }

  DFS(root);

  return res;
}
