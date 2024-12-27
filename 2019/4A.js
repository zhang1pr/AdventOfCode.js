const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let [a, b] = input.split('-').map(a => +a);

  for (let pwd = a; pwd <= b; pwd++) {
    let str = pwd.toString();
    let adj = false;
    let inc = true;

    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] == str[i + 1])
        adj = true;

      if (str[i] > str[i + 1])
        inc = false;
    }

    if (adj && inc)
      res++;
  }

  return res;
}

console.log(solve(input));