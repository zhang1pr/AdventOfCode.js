const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let [cargo, move] = input.split('\n\n');

  cargo = cargo.split('\n');
  move = readnum2d(move.trim());

  let stacks = [[]], idx;
  for (let i = 1; i < cargo[0].length; i += 4) {
    for (let j = cargo.length - 1; j >= 0; j--) {
      let item = cargo[j][i];

      if ('1' <= item && item <= '9') {
        idx = item;
        stacks[idx] = [];
      } else if ('A' <= item && item <= 'Z') {
        stacks[idx].push(item);
      }
    }
  }

  for (let [num, from, to] of move) {
    let tempStack = [];

    while (num) {
      num--;
      tempStack.push(stacks[from].pop());
    }

    while (tempStack.length) {
      stacks[to].push(tempStack.pop());
    }
  }

  return stacks.map(a => a.at(-1) || '').join('');
}

console.log(solve(input));