const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [-1, 0]], ['D', [1, 0]], ['L', [0, -1]], ['R', [0, 1]]]);
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);

  let pos = [0, 0];
  let points = [pos];
  let peri = 0;

  for (let l of arr) {
    let [d, dist, ins] = l.split(' ');

    ins = ins.slice(2, -2);
    let [dr, dc] = dmap.get('RDLU'[l.at(-2)]);
    dist = parseInt(ins, 16);

    pos = [pos[0] + dr * dist, pos[1] + dc * dist];
    peri += dist;
    points.push(pos);
  }

  points.reverse();
  for (let i = 0; i < points.length - 1; i++)
    res += (points[i][1] + points[i + 1][1]) * (points[i][0] - points[i + 1][0]);

  return Math.floor(peri / 2) + Math.floor(res / 2) + 1;
}

console.log(solve(input));