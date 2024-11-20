const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 1;
  let arr = readword(input).filter(a => Boolean(a));
  let driver1 = '[[2]]', driver2 = '[[6]]';
  arr.push(driver1);
  arr.push(driver2);

  function DFS(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    } else if (Number.isInteger(a) ^ Number.isInteger(b)) {
      if (Number.isInteger(a)) return DFS([a], b);
      else return DFS(a, [b]);
    }

    let i = 0, j = 0;
    while (i < a.length && j < b.length) {
      let val = DFS(a[i], b[j]);

      if (val != 0)
        return val;

      i++;
      j++;
    }

    if (i < a.length) return 1;
    if (j < b.length) return -1;
    return 0;
  }

  arr.sort((a, b) => DFS(eval(a), eval(b)));

  for (let i = 0; i < arr.length; i++)
    if (arr[i] == driver1 || arr[i] == driver2)
      res *= i + 1;

  return res;
}

console.log(solve(input));