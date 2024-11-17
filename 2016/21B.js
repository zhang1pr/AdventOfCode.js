const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword2d(input);

  function* permute(nums, i) {
    if (i == nums.length)
      yield nums;

    for (let j = i; j < nums.length; j++) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      yield* permute(nums, i + 1);
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }

  for (let str of permute([...'abcdefgh'], 0))
    if (scramble(str, arr) == 'fbgdceah')
      return str.join('');
}

function scramble(str, arr) {
  for (let [a, b, c, d, e, f, g] of arr) {
    let temp = str.slice();

    if (a == 'swap' && b == 'position') {
      [temp[c], temp[f]] = [temp[f], temp[c]];
    } else if (a == 'swap' && b == 'letter') {
      c = temp.indexOf(c);
      f = temp.indexOf(f);
      [temp[c], temp[f]] = [temp[f], temp[c]];
    } else if (a == 'rotate' && d.startsWith('step')) {
      let steps = c % str.length;
      if (b == 'left')
        steps = (str.length - steps) % str.length;

      temp = [...temp.slice(str.length - steps), ...temp.slice(0, str.length - steps)];
    } else if (a == 'rotate' && b == 'based') {
      let steps = temp.indexOf(g);
      if (steps >= 4)
        steps++;

      steps = (steps + 1) % str.length;
      temp = [...temp.slice(str.length - steps), ...temp.slice(0, str.length - steps)];
    } else if (a == 'reverse') {
      c = +c, e = +e;
      for (let i = c; i <= e; i++)
        temp[i] = str[e - i + c];
    } else if (a == 'move') {
      c = +c, f = +f;
      if (c < f)
        temp = [...temp.slice(0, c), ...temp.slice(c + 1, f + 1), temp[c], ...temp.slice(f + 1)];
      else
        temp = [...temp.slice(0, f), temp[c], ...temp.slice(f, c), ...temp.slice(c + 1)];
    }

    str = temp;
  }

  return str.join('');
}