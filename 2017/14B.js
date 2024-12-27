const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = [];
  let set = new Set();

  for (let num = 0; num < 128; num++) {
    let str = input + '-' + num;

    let hash = getHash(str);
    let output = '';

    for (let ch of hash)
      output += parseInt(ch, 16).toString(2).padStart(4, '0');

    arr.push(output);
  }

  function BFS(r, c) {
    set.add(r + ',' + c);
    let q = [[r, c]];

    while (q.length) {
      let nq = [];

      for (let [r, c] of q) {
        for (let [dr, dc] of darr) {
          let nr = r + dr, nc = c + dc;
          let str = nr + ',' + nc;
          if (isIn(nr, nc, 128, 128) && arr[nr][nc] == '1' && !set.has(str)) {
            set.add(str);
            nq.push([nr, nc]);
          }
        }
      }

      q = nq;
    }
  }

  for (let r = 0; r < 128; r++)
    for (let c = 0; c < 128; c++)
      if (arr[r][c] == '1' && !set.has(r + ',' + c)) {
        res++;
        BFS(r, c);
      }

  return res;
}

function getHash(input) {
  let res = '';
  let inputArr = [...input].map(a => a.charCodeAt());
  let arr = [...inputArr, 17, 31, 73, 47, 23];
  let nums = [...Array(256)].map((_, idx) => idx);
  let skip = 0;
  let t = 0, i = 0;

  while (t < 64) {
    t++;

    for (let len of arr) {
      let end1 = i, end2 = i + len;

      if (end2 < nums.length) {
        nums = [...nums.slice(0, end1), ...nums.slice(end1, end2).reverse(), ...nums.slice(end2)];
      } else {
        end2 = end2 % nums.length;
        let reversed = [...nums.slice(end1), ...nums.slice(0, end2)].reverse();
        let newEnd = nums.length - end1;
        nums = [...reversed.slice(newEnd), ...nums.slice(end2, end1), ...reversed.slice(0, newEnd)];
      }

      i = (i + len + skip) % nums.length;
      skip++;
    }
  }

  for (let i = 0; i < 256; i += 16) {
    let xor = 0;

    for (let j = i; j < i + 16; j++) {
      xor ^= nums[j];
    }

    res += xor.toString(16).padStart(2, 0);
  }

  return res;
}

console.log(solve(input));