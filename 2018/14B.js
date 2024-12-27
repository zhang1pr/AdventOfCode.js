const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = [3, 7];
  let first = 0, second = 1;

  while (!arr.slice(-input.length - 1).join('').includes(input)) {
    let a = arr[first], b = arr[second];
    let digits = arr[first] + arr[second];

    for (let x of digits.toString())
      arr.push(+x);

    first = (first + a + 1) % arr.length;
    second = (second + b + 1) % arr.length;
  }

  return arr.length - input.length - 1 + arr.slice(-input.length - 1).join('').indexOf(input);
}

console.log(solve(input));