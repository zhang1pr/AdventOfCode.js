const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), curId = 1;
  let arr = readword(input).map(
    a => (a.match(/[a-zA-Z-]* (generator|microchip)/g) || []).map(
      a => {
        let name = a.includes('-') ? a.split('-')[0] : a.split(' ')[0];
        let sign = a.split(' ')[1] == 'generator' ? 1 : -1;
        if (!map.has(name)) {
          map.set(name, curId);
          curId++;
        }

        return map.get(name) * sign;
      }
    ).sort((a, b) => a - b)
  );

  let q = [[0, 0, arr]];
  let set = new Set().add(toString(0, arr));

  while (q.length) {
    let nq = [];

    for (let [cur, steps, state] of q) {
      let curFloor = state[cur];
      let down = cur - 1, up = cur + 1;
      let downFloor = state[down], upFloor = state[up];

      if (down >= 0) {
        for (let a of curFloor) {
          let afterFloor = curFloor.filter(c => c != a);

          if (isCompatible(...downFloor, a) && isCompatible(...afterFloor)) {
            let nsteps = steps + 1;
            let nstate = state.map(a => a.slice());
            nstate[down].push(a);
            nstate[down].sort((a, b) => a - b);
            nstate[cur] = afterFloor;

            let hash = toString(down, nstate);

            if (!set.has(hash)) {
              set.add(hash, nsteps);
              nq.push([down, nsteps, nstate]);
            }
          }
        }
      }

      if (up <= 3) {
        let takeTwo = false;

        for (let i = 0; i < curFloor.length; i++) {
          for (let j = i + 1; j < curFloor.length; j++) {
            let a = curFloor[i], b = curFloor[j];
            let afterFloor = curFloor.filter(c => c != a && c != b);

            if (isCompatible(...upFloor, a, b) && isCompatible(...afterFloor)) {
              let nsteps = steps + 1;
              let nstate = state.map(a => a.slice());
              nstate[up].push(a);
              nstate[up].push(b);
              nstate[up].sort((a, b) => a - b);
              nstate[cur] = afterFloor;

              if (done(nstate))
                return nsteps;

              let hash = toString(up, nstate);
              if (!set.has(hash)) {
                takeTwo = true;
                set.add(hash, nsteps);
                nq.push([up, nsteps, nstate]);
              }
            }
          }
        }

        if (!takeTwo) {
          for (let a of curFloor) {
            let afterFloor = curFloor.filter(c => c != a);

            if (isCompatible(...upFloor, a) && isCompatible(...afterFloor)) {
              let nsteps = steps + 1;
              let nstate = state.map(a => a.slice());
              nstate[up].push(a);
              nstate[up].sort((a, b) => a - b);
              nstate[cur] = afterFloor;

              if (done(nstate)) {
                return nsteps;
              }

              let hash = toString(up, nstate);

              if (!set.has(hash)) {
                set.add(hash, nsteps);
                nq.push([up, nsteps, nstate]);
              }
            }
          }
        }
      }
    }

    q = nq;
  }
}

function toString(floor, state) {
  return floor + ':' + state.map(a => {
    let pair = 0, pos = 0, neg = 0;
    let set = new Set(a);

    for (let x of set)
      if (set.has(-x))
        pair++;
      else if (x > 0)
        pos++;
      else
        neg++;

    return [pair / 2, pos, neg].join(',');
  }).join(' ');
}

function done(state) {
  for (let i = 0; i < 3; i++)
    if (state[i].length > 0)
      return false;

  return true;
}

function isCompatible(...items) {
  let pos = new Set(items.filter(a => a > 0));
  let neg = items.filter(a => a < 0);

  if (pos.size == 0) return true;

  for (let microchip of neg)
    if (!pos.has(-microchip))
      return false;

  return true;
}