const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readnum2d(input);

  const dist = (a, b, c, d) => Math.abs(a - c) + Math.abs(b - d);

  let y = 2000000;
  let intervals = [];

  for (let [a, b, c, d] of arr) {
    let closest = dist(a, b, c, d);
    let dToY = dist(a, b, a, y);

    if (closest >= dToY) {
      let diff = closest - dToY;
      intervals.push([a - diff, a + diff]);
    }
  }

  intervals.sort((a, b) => a[0] - b[0]);

  let [lastStart, lastEnd] = intervals[0];
  for (let [start, end] of intervals)
    if (start > lastEnd)
      res += lastEnd - lastStart + 1;
    else
      lastEnd = Math.max(lastEnd, end);

  res += lastEnd - lastStart + 1;

  for (let [a, b, c, d] of arr)
    if (!set.has(c) && d == y) {
      set.add(c);
      res--;
    }

  return res;
}