const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readword(input);

  for (let str of arr) {
    res+=2;
    
    for (let ch of str) {
      if (ch == '\\' || ch == '\"') {
        res++;
      }
    }
  }

  return res;
}
