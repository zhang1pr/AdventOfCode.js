const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map().set('a', 12);
  let arr = readword2d(input);
  let nins = ['cpy b*d a', 'jnz 0 0', 'jnz 0 0', 'jnz 0 0', 'jnz 0 0', 'jnz 0 0'];
  arr = [...arr.slice(0, 4), ...nins.map(a => a.split(' ')), ...arr.slice(4 + nins.length)];

  let i = 0;
  while (i < arr.length) {
    let [a, b, c] = arr[i];
    let vb = +b == b ? +b : map.get(b);
    let vc = +c == c ? +c : map.get(c);

    if (a == 'cpy') {
      if (b.includes('*'))
        vb = map.get('b') * map.get('d');

      if (+c != c)
        map.set(c, vb);
    } else if (a == 'inc') {
      if (+b != b)
        map.set(b, vb + 1);
    } else if (a == 'dec') {
      if (+b != b)
        map.set(b, vb - 1);
    } else if (a == 'jnz') {
      if (vb != 0) {
        i += vc;
        continue;
      }
    } else if (a == 'tgl' && i + vb < arr.length) {
      let ins = arr[i + vb][0], len = arr[i + vb].length;

      if (len == 2)
        arr[i + vb][0] = ins == 'inc' ? 'dec' : 'inc';
      else if (len == 3)
        arr[i + vb][0] = ins == 'jnz' ? 'cpy' : 'jnz';
    }

    i++;
  }

  return map.get('a');
}

console.log(solve(input));