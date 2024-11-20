const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = input.split(',');
  let nums = [0, 0, 0];

  for (let dir of arr) {
    if (dir == 'n' || dir == 's') {
      nums[0] += dir == 'n' ? 1 : -1;
      nums[1] += dir == 'n' ? -1 : 1;
    } else if (dir == 'ne' || dir == 'sw') {
      nums[1] += dir == 'ne' ? 1 : -1;
      nums[2] += dir == 'ne' ? -1 : 1;
    } else if (dir == 'se' || dir == 'nw') {
      nums[0] += dir == 'se' ? 1 : -1;
      nums[2] += dir == 'se' ? -1 : 1;
    }
  }

  return nums.reduce((a, b) => a + Math.abs(b), 0) / 2;
}

console.log(solve(input));