const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = readword(input);

  function f(a, b, ai, bi, starcnt, seenStar, lastcnt = null) {
    if (starcnt > b[bi]) return 0;
    if (ai > a.length) return 0;
    if (ai == a.length) {
      if (bi == b.length && lastcnt == b[bi - 1])
        return 1;

      return 0;
    }

    let str = [a[ai], ai, bi, starcnt, seenStar, lastcnt].join(',');

    if (map.has(str)) return map.get(str);

    let res = 0;

    if (a[ai] == '#') {
      starcnt++, seenStar = true;
      res += f(a, b, ai + 1, bi, starcnt, seenStar, lastcnt);
    } else if (a[ai] == '.') {
      if (starcnt && bi < b.length && b[bi] != starcnt) {
        return 0;
      }

      if (seenStar)
        bi++, lastcnt = starcnt, seenStar = false, starcnt = 0;
      res += f(a, b, ai + 1, bi, starcnt, seenStar, lastcnt);
    } else if (a[ai] == '?') {
      a[ai] = '#';

      res += f(a, b, ai, bi, starcnt, seenStar, lastcnt);

      a[ai] = '.';

      res += f(a, b, ai, bi, starcnt, seenStar, lastcnt);

      a[ai] = '?';
    }

    map.set(str, res);

    return res;
  }

  for (let line of arr) {
    map = new Map();

    let [a, b] = line.split(' ');
    a = [...[a, a, a, a, a].join('?')];
    a = [...a, '.'];
    b = [b, b, b, b, b].join(',').split(',').map(a => +a);

    res += f(a, b, 0, 0, 0, false);
  }

  return res;
}