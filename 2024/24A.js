const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let [wires, gates] = input.split('\n\n').map(readword);

  for (let line of wires) {
    let [a, b] = line.split(': ');
    map.set(a, +b);
  }

  gates = gates.map(a => a.split(' -> '));

  let going = true;

  while (going) {
    going = false;

    for (let [input, output] of gates) {

      if (map.has(output)) continue;

      let ops = ['AND', 'XOR', 'OR'];
      let calc = [(a, b) => a & b, (a, b) => a ^ b, (a, b) => a | b];
      let idx = ops.findIndex(op => input.includes(op));

      let [a, b] = input.split(` ${ops[idx]} `);
      if (!map.has(a) || !map.has(b)) continue;
      let va = map.get(a), vb = map.get(b);

      map.set(output, calc[idx](va, vb));

      going = true;
    }
  }

  return [...map].filter(([k, v]) => k[0] == 'z')
    .sort(([k1, v1], [k2, v2]) => k2.localeCompare(k1))
    .reduce((res, [k, v]) => res * 2 + v, 0);
}

console.log(solve(input));