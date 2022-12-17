function B(input) {
  const arr = [];

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

    arr.push(a * 8 + l);
  });
  
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1] - 2) {
      return arr[i] + 1;
    }
  }
}
