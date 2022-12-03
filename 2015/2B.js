const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/-?\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readword(input).map(a => a.split('x').map(a=>+a).sort((a,b)=>a-b)); 

  for (let [a,b,c] of arr) {
    res += 2*(a+b) + a*b*c;
  }

  return res;
}
