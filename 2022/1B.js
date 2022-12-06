const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let sum = 0;
  let cals = [];
  let arr = readnum(input);
  arr.push(0);
  
  for (let num of arr) {
    if (num == 0) {
      cals.push(sum);
      sum = 0;
    } else {
      sum += num;
    }
  }

  return cals.sort((a,b)=>b-a).slice(0,3).reduce((a,b)=>a+b);
}
