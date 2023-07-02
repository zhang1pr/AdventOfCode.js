const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map([[')', 3], [']', 57], ['}', 1197], ['>', 25137], ['(', ')'],['[', ']'],['{', '}'], ['<','>']]);
  let arr = readword(input);
  let res = 0;

  for (let i=0;i<arr.length;i++) {
    let cur = arr[i];
    let s = [];

    for (let ch of cur) {
      if ('([{<'.includes(ch)) {
        s.push(ch);
      } else {
        let char = s.pop();
        
        if (map.get(char) != ch) {
          res += map.get(ch);
        }
      }
    }
  }

  return res;
}
