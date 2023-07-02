const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map();
  let arr = readword(input);

  while (true) {
    for (let i = 0; i < arr.length; i++) {
      let [name,x] = arr[i].split(': ');
      [var1,sign,var2] = x.split(' ');
      
      if (x == +x) {
        map.set(name, +x);
        continue;
      }

      var1 = var1 == +var1 ? var1 : map.get(var1);
      var2 = map.get(var2);

      if (var1 != null && var2 != null) {
        let exp = `var1 ${sign} var2`;
        let val = eval(exp);

        map.set(name,val);

        if (name == 'root') 
          return val;
      }
    }
  }
}
