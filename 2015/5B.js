const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readword(input);
  
  function hasPair(str) {
    let map = new Map();

    for (let i=1;i<str.length;i++) {
      let key = str[i-1]+str[i];
      let val = map.get(key);

      if (val == null) {
        map.set(key, i);
      } else if (val != i-1) {
        return true;
      }
    }

    return false;
  }

  function hasRepeatingChar(str) {
    for (let i=1;i<str.length-1;i++) {
      if (str[i-1] == str[i+1]) return true;
    }

    return false;
  }

  for (let str of arr) {
    if (hasPair(str) && hasRepeatingChar(str)) {
      res++;
    }
  }

  return res;
}
