const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let getASum = ([px, py, pz, vx, vy, vz, ax, ay, az]) => Math.abs(ax) + Math.abs(ay) + Math.abs(az);
  let getVSum = ([px, py, pz, vx, vy, vz, ax, ay, az]) => Math.abs(vx) + Math.abs(vy) + Math.abs(vz);
  let getPSum = ([px, py, pz, vx, vy, vz, ax, ay, az]) => Math.abs(px) + Math.abs(py) + Math.abs(pz);

  let arr = readnum2d(input).map((a, idx) => [...a, idx]).sort((a, b) => {
    let diffA = getASum(a) - getASum(b);
    if (diffA != 0) return diffA;

    let diffV = getVSum(a) - getVSum(b);
    if (diffV != 0) return diffV;

    let diffP = getPSum(a) - getPSum(b);
    if (diffP != 0) return diffP;
  });

  return arr[0].at(-1);
}

console.log(solve(input));