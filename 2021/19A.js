const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set();
  let scset = new Set().add(0);

  let arr = readword(input);
  let A = [];
  let id = -1;
  for (let a of arr) {
    if (a[1] == '-') {
      id++;
      A[id] = [];
    } else if (a != '') {
      A[id].push(a.split(',').map(a => Number(a)));
    }
  }

  function compare(i, j) {
    let sci = A[i], scj = A[j];
    let leni = sci.length, lenj = scj.length;
    let di = [...Array(leni)].map(a => new Map());
    let dj = [...Array(lenj)].map(a => new Map());

    calc(sci, di); calc(scj, dj);
    let idxarr = [];

    for (let i = 0; i < leni; i++) {
      let mapi = di[i];

      for (let j = 0; j < lenj; j++) {
        let sum = 0;
        let mapj = dj[j];

        for (let [ki, vi] of mapi) {
          let vj = mapj.get(ki) || [];
          sum += vj.length;
        }

        if (sum >= 11) {
          idxarr.push([i, j]);
        }
      }
    }

    if (idxarr.length < 12) return;
    let sign = [];
    let mapidx = [];
    let flag = true;
    for (let i = 0; i < idxarr.length; i++) {
      for (let j = i + 1; j < idxarr.length; j++) {
        let [i1, j1] = idxarr[i], [i2, j2] = idxarr[j];
        let [a1, b1, c1] = sci[i1], [a2, b2, c2] = sci[i2];

        let diff1 = [a1 - a2, b1 - b2, c1 - c2];
        let tmp = diff1.map(a => Math.abs(a));
        if (new Set(tmp).size != 3) continue;

        let [a3, b3, c3] = scj[j1], [a4, b4, c4] = scj[j2];
        let diff2 = [a3 - a4, b3 - b4, c3 - c4];
        let diff3 = [];

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (Math.abs(diff1[i]) == Math.abs(diff2[j])) {
              mapidx[j] = i;
              diff3[i] = diff2[j];
            }
          }
        }

        for (let j = 0; j < 3; j++) {
          sign[j] = diff3[j] / diff1[j];
        }

        flag = false;
        break;
      }

      if (!flag) break;
    }

    let nscj = [];
    let [sami, samj] = idxarr[0];

    let [a1, b1, c1] = scj[samj];
    for (let sc of scj) {
      let [a2, b2, c2] = sc;
      let d = [a2 - a1, b2 - b1, c2 - c1];

      let arr = sc.reduce((a, b, idx) => {
        let nidx = mapidx[idx];
        a[nidx] = sci[sami][nidx] + d[idx] * sign[nidx];
        return a;
      }, []);
      nscj.push(arr);
    }

    A[j] = nscj;
    scset.add(j);
    add(i); add(j);
  }

  function add(idx) {
    for (let [a, b, c] of A[idx]) {
      set.add(a + ',' + b + ',' + c);
    }
  }

  function calc(sc, darrm) {
    let len = sc.length;

    for (let ii = 0; ii < len; ii++) {
      let [ai, bi, ci] = sc[ii];
      for (let jj = ii + 1; jj < len; jj++) {
        let [aj, bj, cj] = sc[jj];
        let a = (ai - aj) ** 2, b = (bi - bj) ** 2, c = (ci - cj) ** 2;
        let dis = a + b + c;

        if (!darrm[ii].has(dis)) darrm[ii].set(dis, []);
        if (!darrm[jj].has(dis)) darrm[jj].set(dis, []);

        darrm[ii].get(dis).push(jj);
        darrm[jj].get(dis).push(ii);
      }
    }
  }

  while (scset.size < A.length) {
    for (let i = 0; i < A.length; i++) {
      if (!scset.has(i)) continue;

      for (let j = 0; j < A.length; j++) {
        if (scset.has(j)) continue;

        compare(i, j);
      }
    }
  }

  return set.size;
}

console.log(solve(input));