const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input);

  for (let str of arr) {
    res+=2;
    
    for (let i=0;i<str.length;i++) {
      if (str[i] == '\\') {
        if (str[i+1] == 'x') {
          res+=3;
          i+=3;
        } else {
          res++;
          i++;
        }
      }
    }
  }

  return res;
}
