const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let str = input;
  let cur = '';

  for (let i=0;i<str.length;i++) {
    let ch = str[i];

    if (ch >= '0' && ch <= '9' || ch == '-') {
      cur += ch;
    } else if (cur) {
      res += Number(cur);
      cur = '';
    }
  }

  return res;
}
