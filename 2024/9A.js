const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = input.split('').map(a => +a);
  let disk = [];
  let f = false;
  let id = -1;

  for (let x of arr) {
    f = !f;

    if (f)
      id++;

    for (let cnt = 1; cnt <= x; cnt++)
      disk.push(f ? id : null);
  }

  let l = 0, r = disk.length - 1;
  while (l < r)
    if (disk[l] != null)
      l++;
    else if (disk[r] == null)
      r--;
    else
      [disk[l], disk[r]] = [disk[r], disk[l]];

  for (let i = 0; i < disk.length; i++)
    if (disk[i] != null)
      res += i * disk[i];

  return res;
}

console.log(solve(input));