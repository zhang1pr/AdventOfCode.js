function A(input) {
  let res = 0;

  input.split('\n').forEach(line => {
    let a = 0;
    let b = 127;
    let c;
    let l = 0;
    let r = 7;
    let m;

    let i = 0;
    for (; i < line.length; i++) {
      const ch = line[i];
      
      if (ch != 'B' && ch != 'F') {
        break;
      }
      
      c = (a + b) >>> 1;
      
      if (ch == 'F') {
        b = c; 
      } else {
        a = c + 1;
      }
    }
    
    for (; i < line.length; i++) {
      const ch = line[i];

      m = (l + r) >>> 1;
      
      if (ch == 'L') {
        r = m;
      } else {
        l = m + 1;
      }
    }

    res = Math.max(res, a * 8 + l);
  });

  return res;
}
