const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = readword(input);
  let maparr = [...Array(arr[0].length)].map(() => new Map());

  for (let str of arr) {
    for (let i=0;i<str.length;i++) {
      let map = maparr[i], ch = str[i];
      map.set(ch, (map.get(ch) || 0) + 1);
    }
  }

  return maparr.map(map => 
    [...map].sort((a,b) => b[1] - a[1])[0][0]
  ).join('');
}
