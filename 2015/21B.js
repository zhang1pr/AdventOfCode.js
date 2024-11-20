const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let [bosshp, bossatk, bossarm] = readword(input).map(a => Number(a.split(': ')[1]));
  let p1hp = 100;

  let W = [[8, 4], [10, 5], [25, 6], [40, 7], [74, 8]];
  let A = [[13, 1], [31, 2], [53, 3], [75, 4], [102, 5]];
  let R = [[25, 1, 0], [50, 2, 0], [100, 3, 0], [20, 0, 1], [40, 0, 2], [80, 0, 3]];
  let len = R.length;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      R.push([R[i][0] + R[j][0], R[i][1] + R[j][1], R[i][2] + R[j][2]]);
    }
  }

  A.push([0, 0, 0]);
  R.push([0, 0, 0]);
  R.sort((a, b) => a[0] - b[0]);

  function fight(atk, arm) {
    return Math.ceil(p1hp / Math.max(1, bossatk - arm)) >= Math.ceil(bosshp / Math.max(1, atk - bossarm));
  }

  for (let [wgold, watk] of W) {
    for (let [agold, aarm] of A) {
      for (let [rgold, ratk, rarm] of R) {
        let curgold = wgold + agold + rgold;
        let curatk = watk + ratk;
        let curarm = aarm + rarm;

        if (!fight(curatk, curarm)) {
          res = Math.max(curgold, res);
        }
      }
    }
  }

  return res;
}

console.log(solve(input));