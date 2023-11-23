const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = 0;
  let arr = readnum2d(input);

  function BFS(ore1, clay1, obs1, obs2, geo1, geo2, t) {
    let res = 0;
    let q = [[0, 0, 0, 0, 1, 0, 0, 0, t]];
    let visited = new Set();

    while (q.length) {
      let nq = [];
      for (let [ore, clay, obs, geo, r1, r2, r3, r4, t] of q) {
        res = Math.max(res, geo);
        if (t == 0) continue;

        let max = Math.max(ore1, clay1, obs1, geo1);
        r1 = Math.min(max, r1);
        r2 = Math.min(obs2, r2);
        r3 = Math.min(geo2, r3);
        ore = Math.min(t * max - r1 * (t - 1), ore);
        clay = Math.min(t * obs2 - r2 * (t - 1), clay);
        obs = Math.min(t * geo2 - r3 * (t - 1), obs);

        let state = [ore, clay, obs, geo, r1, r2, r3, r4, t];

        if (visited.has(state.join(',')))
          continue;
        visited.add(state.join(','));

        nq.push([ore + r1, clay + r2, obs + r3, geo + r4, r1, r2, r3, r4, t - 1]);
        if (ore >= ore1)
          nq.push([ore - ore1 + r1, clay + r2, obs + r3, geo + r4, r1 + 1, r2, r3, r4, t - 1]);
        if (ore >= clay1)
          nq.push([ore - clay1 + r1, clay + r2, obs + r3, geo + r4, r1, r2 + 1, r3, r4, t - 1]);
        if (ore >= obs1 && clay >= obs2)
          nq.push([ore - obs1 + r1, clay - obs2 + r2, obs + r3, geo + r4, r1, r2, r3 + 1, r4, t - 1]);
        if (ore >= geo1 && obs >= geo2)
          nq.push([ore - geo1 + r1, clay + r2, obs - geo2 + r3, geo + r4, r1, r2, r3, r4 + 1, t - 1]);
      }

      q = nq;
    }

    return res;
  }

  for (let i = 0; i < arr.length; i++) {
    let [idx, ore1, clay1, obs1, obs2, geo1, geo2] = arr[i];
    let val = BFS(ore1, clay1, obs1, obs2, geo1, geo2, 24);
    res += val * idx;
  }

  return res;
}