const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set();
  let [wires, gates] = input.split('\n\n').map(readword);

  let cnt = wires.length / 2;

  let arr = [];
  for (let line of gates) {
    let [inputs, output] = line.split(' -> ');
    let [a, op, b] = inputs.split(' ');

    if (b[0] == 'x')
      [a, b] = [b, a];

    arr.push([a, op, b, output]);
  }

  let xor1 = [], xor2 = [], outputs = [];

  for (let [a, op, b, output] of arr) {
    if (op == 'XOR')
      if (a[0] == 'x')
        xor1.push([a, op, b, output]);
      else
        xor2.push([a, op, b, output]);

    if (output[0] == 'z')
      outputs.push([a, op, b, output]);
  }

  for (let [a, op, b, output] of xor1)
    if (a == 'x00' && output !== 'z00' || a != 'x00' && output[0] == 'z')
      set.add(output);

  for (let [a, op, b, output] of xor2)
    if (output[0] != 'z')
      set.add(output);

  for (let [a, op, b, output] of outputs)
    if (output.endsWith(cnt) && op != 'OR' || !output.endsWith(cnt) && op != 'XOR')
      set.add(output);

  let fix = [];
  for (let gate of xor1) {
    let output = gate[3];
    if (set.has(output) || output == 'z00') continue;

    if (xor2.find(([a, op, b]) => a == output || b == output) == null) {
      fix.push(gate);
      set.add(output);
    }
  }

  for (let [a, op, b, output] of fix) {
    let cand = xor2.find(gate => gate[3] == 'z' + a.slice(1));
    let match = arr.find(([a, op, b, output]) => op == 'OR' && cand.includes(output));

    set.add(cand.find(output => output != match[3]));
  }

  return [...set].sort().join(',');
}

console.log(solve(input));