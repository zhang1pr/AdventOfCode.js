const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = Infinity;
  let arr = readword2d(input);
  let root = new Map();

  let cur = root;
  for (let [a, b, c] of arr) {
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
      if (!Number.isInteger(child) && 70000000 - used + val >= 30000000) {
        res = Math.min(res, val);
      }

      total += val;
    }

    return total;
  }

  let used = Infinity;
  used = DFS(root);
  DFS(root);

  return res;
}