const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readword(input).map(a => a.split(','))[0];

  let d = 256;
  let cnt = Array(9).fill(0);
  for (let a of arr) cnt[a]++;

  while (d) {
    d--;
    let ncnt = cnt.slice().fill(0);

    for (let i = 0; i < cnt.length; i++) {
      let cur = i, num = cnt[i];
      cur--;

      if (cur == -1) {
        ncnt[8] += num;
        ncnt[6] += num;
      } else {
        ncnt[cur] += num;
      }
    }

    cnt = ncnt;
  }

  return cnt.reduce((a, b) => a + b);
}