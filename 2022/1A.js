const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = sum = 0;
  let arr = readnum(input);
  arr.push(0);
  
  for (let num of arr) {
    if (num == 0) {
      res = Math.max(res, sum);
      sum = 0;
    } else {
      sum += num;
    }
  }

  return res;
}
