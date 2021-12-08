const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = readword(input).map(a => a.split(' | ').map(a=>a.split(' '))); 

  for (let i=0;i<arr.length;i++) {
    let cur = arr[i][1];

    for (let n of cur) {
      if ([2,3,4,7].includes(n.length)) res++;
    }
  }

  return res;
}
