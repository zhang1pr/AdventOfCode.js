const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input);
  
  for (let str of arr) {
    let outside = true, flag1 = false, flag2 = false;

    for (let i=0; i<str.length-3; i++) {
      if (str[i] == '[' || str[i] == ']') {
        outside = !outside;
        continue;
      }

      if (str[i] != str[i+1] && str[i+1] == str[i+2] && str[i] == str[i+3])
        if (outside)
          flag1 = true;
        else
          flag2 = true;
    }

    if (flag1 && !flag2)
      res++;
  }

  return res;
}
