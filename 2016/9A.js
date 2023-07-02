const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input);
  let last;
  
  for (let str of arr) {
    res += str.length;

    let i=0;
    while (i<str.length) {
      let ch = str[i];
      if (ch == '(') {
        last = i;
        i++;
      } else if (ch == ')') {
        let [a,b] = str.slice(last+1, i).split('x').map(a=>+a);
        res += a * (b-1) - (i - last + 1);
        i += a+1;
      } else {
        i++;
      }
    }
  }

  return res;
}
