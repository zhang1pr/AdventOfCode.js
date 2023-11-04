const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readword2d(input);
   
  let idx = 0, map = new Map([['a',1],['b',0]]);
  
  while (idx >= 0 && idx < arr.length) {
    let [ins, name1, name2] = arr[idx];
    if (name2) name1 = name1.slice(0, name1.length-1);
    let val1, val2;

    if (Number.isInteger(+name1))
      val1 = +name1;  
    else 
      val1 = map.get(name1); 

    val2 = +name2;

    if (ins == 'jio') {
      if (val1 == 1) idx+=val2;
      else idx++;
    } else if (ins == 'jie') {
      if (val1 % 2 == 0) idx+=val2;
      else idx++;
    } else if (ins == 'jmp') {
      idx += val1;
    } else if (ins == 'hlf') {
      val1 /= 2;
      idx++;
    } else if (ins == 'tpl') {
      val1 *= 3;
      idx++;
    } else if (ins == 'inc') {
      val1++;
      idx++;
    }

    if (!Number.isInteger(+name1))
      map.set(name1, val1);
  }

  return map.get('b');
}