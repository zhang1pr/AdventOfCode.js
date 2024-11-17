const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = Infinity, tmp = 0, t = 0;
  let arr = readnum(input).reverse();
  let sum = arr.reduce((a, b) => a + b);

  function check(idx, total, count, multi) {
    if (multi > res) return;

    if (total == 0 && count == 0) {
      if (check2(0, sum / 3)) {
        res = Math.min(res, multi);
      }

      return;
    }

    if (total <= 0 || count == 0 || idx == arr.length) return;

    set.add(arr[idx]);
    check(idx + 1, total - arr[idx], count - 1, multi * arr[idx]);
    set.delete(arr[idx]);
    check(idx + 1, total, count, multi);
  }

  function check2(idx, total) {
    if (total == 0) {
      return true;
    }

    if (total < 0 || idx == arr.length) return false;

    let f = false;
    if (!set.has(arr[idx])) {
      f ||= check2(idx + 1, total - arr[idx]);
    }

    f ||= check2(idx + 1, total);

    return f;
  }

  let max = 0;
  for (let i = 1; i <= arr.length / 3; i++) {
    max += arr[i - 1];
    if (max < sum / 3) continue;
    check(0, sum / 3, i, 1);

    if (res != Infinity) break;
  }

  return res;
}