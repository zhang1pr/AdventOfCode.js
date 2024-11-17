const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let [depth, x, y] = readnum(input);
  let M = 20183;

  let erosion = Array(x + 1).fill(0);

  for (let i = 0; i <= y; i++) {
    let nErosion = erosion.slice();

    for (let j = 0; j <= x; j++) {
      if (i == 0)
        nErosion[j] = (j * 16807 + depth) % M;
      else if (j == 0)
        nErosion[j] = (i * 48271 + depth) % M;
      else if (i == x && j == y)
        nErosion[j] = 0;
      else
        nErosion[j] = (nErosion[j - 1] * erosion[j] + depth) % M;

      res += nErosion[j] % 3;
    }

    erosion = nErosion;
  }

  return res;
}