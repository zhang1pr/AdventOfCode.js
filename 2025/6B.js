const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;
  let bound = R - 2;

  let nums = [], sign;
  for (let i = 0; i < C; i++) {
    if (arr[bound][i] != ' ') {
      nums = nums.filter(Boolean);

      if (nums.length) res += sign == '+' ? nums.reduce((a, b) => a + +b, 0) : nums.reduce((a, b) => a * +b, 1);
      sign = arr[bound][i];
      nums = [];
    }

    let str = '';
    for (let j = 0; j < bound; j++)
      if (arr[j][i] != ' ')
        str += arr[j][i];

    nums.push(str);
  }

  res += sign == '+' ? nums.reduce((a, b) => a + +b, 0) : nums.reduce((a, b) => a * +b, 1);

  return res;
}

console.log(solve(input));