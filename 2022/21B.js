const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map();
  let arr = readword(input);
  let targetA, targetB, target;
 
  for (let ins of arr) {
    if (ins.startsWith('root')) {
      let [name, exp] = ins.split(': ');
      exp = exp.split(' ');
      [targetA, targetB] = [exp[0], exp[2]];
      break;
    }
  }

  for (let i=0; i<arr.length; i++) {
    for (let ins of arr) {
      let [name,x] = ins.split(': ');
      if (map.has(name) || name == 'humn') continue;

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

        if (name == targetA || name == targetB) {
          target = name == targetA ? targetB : targetA;
          map.set(target, val);
        }
      }
    }
  }

  while (true) {
    for (let i = 0; i < arr.length; i++) {
      let [name,x] = arr[i].split(': ');
      if (name != target) continue;
      [var1,sign,var2] = x.split(' ');
      
      if (x == +x) {
        map.set(name, +x);
        continue;
      }

      name = map.get(name);

      let exp;
      if (map.has(var1)) {
        var1 = map.get(var1);
        if (sign == '+')
          exp = 'name - var1';
        else if (sign == '-')
          exp = 'var1 - name';
        else if (sign == '*')
          exp = 'name / var1';
        else if (sign == '/')
          exp = 'var1 / name'; 
        
        target = var2;
      } else if (map.has(var2)) {
        var2 = map.get(var2);
        if (sign == '+')
          exp = 'name - var2';
        else if (sign == '-')
          exp = 'name + var2';
        else if (sign == '*')
          exp = 'name / var2';
        else if (sign == '/')
          exp = 'name * var2'; 
      
        target = var1;
      }

      val = eval(exp);
      map.set(target, val)
      
      if (target == 'humn') {
        return val;
      }
    }
  }
}
