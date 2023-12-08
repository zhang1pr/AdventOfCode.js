const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map(), res = 1;
  let arr = readword(input);
  let ins = arr[0];
  let nodes = [];

  for (let i = 2; i < arr.length; i++) {
    let line = arr[i].split(' ');
    let cur = line[0], l = line[2].slice(1, -1), r = line[3].slice(0, -1);

    if (cur.at(-1) == 'A')
      nodes.push(cur);

    map.set(cur, [l, r]);
  }

  function f(cur) {
    let res = 0;

    while (true) {
      for (let x of ins) {
        res++;
        let [l, r] = map.get(cur);

        cur = x == 'L' ? l : r;
      }

      if (cur.at(-1) == 'Z') break;
    }

    return res;
  }

  for (let x of nodes)
    res = lcm(res, f(x));

  return res;
}

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
console.log(B(input));