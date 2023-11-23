const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map([[')', 1], [']', 2], ['}', 3], ['>', 4], ['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']]);
  let arr = readword(input);
  let ans = [];
  let res = 0;

  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];
    let s = [];
    res = 0;

    for (let ch of cur) {
      if ('([{<'.includes(ch)) {
        s.push(ch);
      } else {
        let char = s.pop();

        if (map.get(char) != ch) {
          s = [];
          break;
        }
      }
    }

    while (s.length) {
      res = res * 5 + map.get(map.get(s.pop()));
    }

    if (res) {
      ans.push(res);
    }
  }

  ans.sort((a, b) => a - b);
  return ans[Math.floor(ans.length / 2)];
}