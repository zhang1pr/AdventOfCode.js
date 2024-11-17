const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum2d(input);

  const dist = (a, b, c, d) => Math.abs(a - c) + Math.abs(b - d);

  let MAX = 4000000;
  for (let y = 0; y <= MAX; y++) {
    let intervals = [];

    for (let [a, b, c, d] of arr) {
      let closest = dist(a, b, c, d);
      let dToY = dist(a, b, a, y);

      if (closest >= dToY) {
        let diff = closest - dToY;
        intervals.push([a - diff, a + diff]);
      }
    }

    intervals.push([MAX + 1, MAX + 1]);
    intervals.sort((a, b) => a[0] - b[0]);
    let last = 0;

    for (let [start, end] of intervals)
      if (start > last)
        return last * 4000000 + y;
      else
        last = Math.max(last, end + 1);
  }
}