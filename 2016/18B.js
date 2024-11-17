const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0, t = 1;
  let str = input;
  let LEN = str.length;

  let isTrap = ch => ch == '^';
  for (let ch of str)
    if (!isTrap(ch))
      res++;

  while (t < 400000) {
    t++;
    let nstr = '';

    for (let i = 0; i < LEN; i++) {
      let a = i > 0 ? str[i - 1] : '.';
      let b = i < LEN - 1 ? str[i + 1] : '.';

      let flag = isTrap(a) ^ isTrap(b);
      nstr += flag ? '^' : '.';

      if (!flag)
        res++;
    }

    str = nstr;
  }

  return res;
}