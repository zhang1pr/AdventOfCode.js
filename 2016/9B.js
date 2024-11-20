const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);

  for (let str of arr) {
    res += calc(str, 0, str.length);
  }

  return res;
}

function calc(str, start, end) {
  let res = 0, last;

  let i = start;
  while (i < end) {
    if (str[i] == '(') {
      last = i;
      i++;
    } else if (str[i] == ')') {
      let [a, b] = str.slice(last + 1, i).split('x').map(a => +a);
      let val = calc(str, i + 1, i + 1 + a);

      i += a + 1;
      last = null;
      res += val * b;
    } else if (last == null) {
      res++;
      i++;
    } else {
      i++;
    }
  }

  return res;
}

console.log(solve(input));