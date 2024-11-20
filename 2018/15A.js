const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, -1], [-1, 0], [1, 0], [0, 1]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let eMap = new Map(), gMap = new Map(), hpMap = new Map(), t = 0;
  let arr = readword(input).map(a => a.split('')), R = arr.length, C = arr[0].length;
  let creatures = [], idx = 0;

  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] == 'E' || arr[i][j] == 'G') {
        creatures.push([i, j, idx]);
        let str = i + ',' + j;
        hpMap.set(idx, 200);

        if (arr[i][j] == 'E') eMap.set(str, idx);
        if (arr[i][j] == 'G') gMap.set(str, idx);
        idx++;
      }
    }

  function BFS(ti, tj, map) {
    let res = [], visited = new Set(), q = [[ti, tj]];

    while (q.length && res.length == 0) {
      let nq = [];

      for (let [i, j] of q) {
        for (let [di, dj] of darr) {
          let ni = i + di, nj = j + dj, nstr = ni + ',' + nj;

          if (map.has(nstr)) {
            res.push([i, j]);
            continue;
          }

          if (visited.has(nstr) || !isIn(ni, nj, R, C) || arr[ni][nj] != '.') continue;
          visited.add(nstr);

          nq.push([ni, nj]);
        }
      }

      q = nq;
    }

    if (!res.length) return [ti, tj];

    res.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);

    let [ri, rj] = res[0];

    if ((hpMap.get(ri + ',' + rj) || 0) > 0) return [ti, tj];

    q = [[ri, rj]], res = [], visited = new Set();

    while (q.length && res.length == 0) {
      let nq = [];

      for (let [i, j] of q) {
        for (let [di, dj] of darr) {
          let ni = i + di, nj = j + dj, nstr = ni + ',' + nj;

          if (ni == ti && nj == tj) {
            res.push([i, j]);
            continue;
          }

          if (visited.has(nstr) || !isIn(ni, nj, R, C) || arr[ni][nj] != '.') continue;
          visited.add(nstr);

          nq.push([ni, nj]);
        }
      }

      q = nq;
    }

    res.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);

    if (res.length) {
      let [ni, nj] = res[0];

      if (arr[ni][nj] == '.')
        return [ni, nj];
    }

    return [ti, tj];
  }

  while (true) {
    t++;
    creatures.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
    let ncreatures = [];

    for (let [i, j, idx] of creatures) {
      let str = i + ',' + j, isElf = eMap.has(str);
      let ni = i, nj = j;

      if (gMap.size == 0 || eMap.size == 0) {
        t--;
        break;
      }

      if (hpMap.get(idx) <= 0) continue;

      let target = [];

      for (let [di, dj] of darr) {
        let ti = i + di, tj = j + dj, tstr = ti + ',' + tj;

        if (isElf && gMap.has(tstr))
          target.push([ti, tj, gMap.get(tstr)]);

        if (!isElf && eMap.has(tstr))
          target.push([ti, tj, eMap.get(tstr)]);
      }

      if (!target.length) {
        [ni, nj] = BFS(i, j, isElf ? gMap : eMap);
        let nstr = ni + ',' + nj;

        if (isElf) {
          eMap.delete(str);
          eMap.set(nstr, idx);
        } else {
          gMap.delete(str);
          gMap.set(nstr, idx);
        }
        arr[i][j] = '.';
        arr[ni][nj] = '#';

        for (let [di, dj] of darr) {
          let ti = ni + di, tj = nj + dj, tstr = ti + ',' + tj;

          if (isElf && gMap.has(tstr))
            target.push([ti, tj, gMap.get(tstr)]);

          if (!isElf && eMap.has(tstr))
            target.push([ti, tj, eMap.get(tstr)]);
        }
      }

      target.sort((a, b) =>
        hpMap.get(a[2]) == hpMap.get(b[2]) ?
          (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]) :
          hpMap.get(a[2]) - hpMap.get(b[2])
      );

      if (target.length) {
        let [ti, tj, tidx] = target[0];
        let tstr = ti + ',' + tj;
        let hp = hpMap.get(tidx) - 3;
        hpMap.set(tidx, hp);

        if (hp <= 0) {
          eMap.delete(tstr);
          gMap.delete(tstr);
          arr[ti][tj] = '.';
        }
      }

      ncreatures.push([ni, nj, idx]);
    }

    creatures = ncreatures.filter(([i, j, idx]) => hpMap.get(idx) > 0);

    if (gMap.size == 0 || eMap.size == 0) break;
  }

  return t * [...hpMap.values()].reduce((a, b) => a + (b > 0 ? b : 0), 0);
}

console.log(solve(input));