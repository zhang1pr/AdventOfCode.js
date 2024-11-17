const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input);
  let tmp = '', tmp2 = '';

  let carr = arr.slice();
  let i = 0;
  while (carr.length > 1) {
    let cnt = 0;
    let narr = [];

    for (let cur of carr) {
      if (cur[i] == '1') {
        cnt++;
      }
    }

    for (let cur of carr) {
      if ((cur[i] == 1) ^ (cnt < carr.length - cnt)) {
        narr.push(cur);
      }
    }

    carr = narr;
    i++;
  }
  tmp = carr[0];

  carr = arr;
  i = 0;
  while (carr.length > 1) {
    let cnt = 0;
    let narr = [];

    for (let cur of carr) {
      if (cur[i] == '1') {
        cnt++;
      }
    }

    for (let cur of carr) {
      if ((cur[i] == 1) ^ (cnt >= carr.length - cnt)) {
        narr.push(cur);
      }
    }

    carr = narr;
    i++;
  }

  tmp2 = carr[0];
  return parseInt(tmp, 2) * parseInt(tmp2, 2);
}