function A(input) {
  const arr = [];
  let res = 0;
  let flag = false;

  input.split('\n').forEach(line => {
    if (line.includes('-')) {
      const parts = line.split(':')[1].split(' ');
      const first = parts[1].split('-').map(a => Number(a));
      const second = parts[3].split('-').map(a => Number(a));
      arr.push([...first, ...second]);
    } else if (flag) {
      const nums = line.split(',').map(a => Number(a));
      
      for (const num of nums) {
        let isValid = false;
        for (const [a, b, c, d] of arr) {
          if (a <= num && num <= b || c <= num && num <= d) {
            isValid = true;
            break;
          }  
        }
       
        if (!isValid) {
          res += num;
        }
      }
    }

    if (line.includes('nearby')) {
      flag = true;
    }
  });

  return res;
}
