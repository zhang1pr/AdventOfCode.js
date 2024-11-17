const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = input.length;

  for (let x of input) set.add(x.toLowerCase());

  for (let x of set) {
    let str = '';

    for (let ch of input)
      if (ch.toLowerCase() != x)
        str += ch;

    res = Math.min(res, process(str));
  }

  return res;
}

function process(str) {
  str += '.';
  let stack = [];

  for (let ch of str) {
    let last = stack.at(-1) || '.';

    if (ch != last && ch.toLowerCase() == last.toLowerCase())
      stack.pop();
    else
      stack.push(ch);
  }

  stack.pop();
  return stack.length;
}