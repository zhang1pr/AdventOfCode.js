const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map();
  let arr = readword2d(input);
  let res = 0;

  for (let [varName, ins, num, ifWord, varName2, sign, num2] of arr) {
    num = +num;
    let val = map.get(varName) || 0;
    let val2 = map.get(varName2) || 0;

    if (eval([val2, sign, num2].join(' '))) {
      val += ins == 'inc' ? num : -num;
      res = Math.max(res, val);
      map.set(varName, val);
    }
  }

  return res;
}

console.log(solve(input));