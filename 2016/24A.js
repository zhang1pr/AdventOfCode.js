const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let posMap = new Map(), distMap = new Map();
  let arr = readword(input), R = arr.length, C = arr[0].length;

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if ('0' <= arr[r][c] && arr[r][c] <= '9')
        posMap.set(+arr[r][c], [r, c]);

  let max = Math.max(...posMap.keys());

  function BFS(src, toFind) {
    let [r, c] = posMap.get(src);

    let q = [[r, c]];
    let d = 0;
    let set = new Set().add(r + ',' + c);

    while (q.length && toFind) {
      let nq = [];
      d++;

      for (let [r, c] of q) {
        for (let [dr, dc] of darr) {
          let nr = r + dr, nc = c + dc;
          let str = nr + ',' + nc;

          if (isIn(nr, nc, R, C) && !set.has(str) && arr[nr][nc] != '#') {
            if ('0' <= arr[nr][nc] && arr[nr][nc] <= '9') {
              toFind--;
              distMap.set(src + ',' + arr[nr][nc], d);
            }

            set.add(str);
            nq.push([nr, nc]);
          }
        }
      }

      q = nq;
    }
  }

  for (let i = 0; i <= max; i++)
    BFS(i, max);

  function* permute(nums, i) {
    if (i == nums.length)
      yield nums;

    for (let j = i; j < nums.length; j++) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      yield* permute(nums, i + 1);
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }

  let nums = [...Array(max)].map((_, idx) => idx + 1);
  let res = Infinity;

  for (let order of permute(nums, 0)) {
    let norder = [0, ...order];
    let d = 0;

    for (let i = 1; i < norder.length; i++) {
      let src = norder[i - 1], target = norder[i];

      d += distMap.get(src + ',' + target);
    }

    res = Math.min(res, d);
  }

  return res;
}

console.log(solve(input));