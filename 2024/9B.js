const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = input.split('').map(a => +a);
  let disk = [];
  let f = false;
  let id1 = -1, id2 = 0;

  for (let x of arr) {
    f = !f;

    if (f)
      id1++, map.set(id1, x);
    else
      id2--, map.set(id2, x);

    for (let cnt = 1; cnt <= x; cnt++)
      disk.push(f ? id1 : id2);
  }

  let r = disk.length - 1;
  while (r >= 0) {
    if (disk[r] < 0) {
      r--;
      continue;
    }

    let moved = false;
    let l = 0;

    while (l < r) {
      if (disk[l] >= 0 || map.get(disk[l]) == 0)
        l++;
      else {
        let lenA = map.get(disk[l]);
        let lenB = map.get(disk[r]);

        if (lenB > lenA)
          l += lenA;
        else {
          map.set(disk[l], lenA - lenB);
          if (disk[r - lenB] < 0)
            map.set(disk[r - lenB], map.get(disk[r - lenB]) + lenB);

          for (let i = l, j = r; i < l + lenB; i++, j--)
            [disk[i], disk[j]] = [disk[j], disk[i]];

          l += lenB;
          r -= lenB;

          moved = true;
          break;
        }
      }
    }

    if (!moved)
      r--;
  }

  console.log(disk.slice(0, 100));
  for (let i = 0; i < disk.length; i++)
    if (disk[i] > 0)
      res += i * disk[i];

  return res;
}

console.log(solve(input));