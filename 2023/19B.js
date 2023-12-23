const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const cp = (state) => JSON.parse(JSON.stringify(state));
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map(), res = 0;
  let arr = readword(input);
  let letters = new Map();
  for (let i = 0; i < 4; i++)
    letters.set('xmas'[i], i);

  for (let rule of arr) {
    if (rule == '') break;
    let [name, rest] = rule.slice(0, -1).split('{');
    if (!map.has(name)) map.set(name, []);

    for (let w of rest.split(','))
      if (w.includes(':'))
        map.get(name).push(w.split(':'));
      else
        map.get(name).push([w]);
  }

  function f(mins, maxes, name, i = 0) {
    let diffs = [];
    for (let i = 0; i < 4; i++)
      diffs.push(maxes[i] - mins[i] + 1);

    for (let d of diffs)
      if (d < 0)
        return;

    if (name == 'A') {
      res += diffs.reduce((a, b) => a * b, 1);
      return;
    }

    if (name == 'R')
      return;

    let [rule, next] = map.get(name)[i];
    if (next == null) {
      f(mins, maxes, rule);
      return;
    }

    let idx = letters.get(rule[0]);

    let number = +rule.slice(2);
    if (rule.includes('>')) {
      let nmins = cp(mins), nmaxes = cp(maxes);
      mins[idx] = Math.max(mins[idx], number + 1);
      f(mins, nmaxes, next);
      maxes[idx] = Math.min(maxes[idx], number);
      f(nmins, maxes, name, i + 1);

    } else if (rule.includes('<')) {
      let nmins = cp(mins), nmaxes = cp(maxes);

      maxes[idx] = Math.min(maxes[idx], number - 1);
      f(nmins, maxes, next);

      mins[idx] = Math.max(mins[idx], number);
      f(mins, nmaxes, name, i + 1);
    }
  }

  f([1, 1, 1, 1], [4000, 4000, 4000, 4000], 'in', 0);
  return res;
}