function A(input) {
  const map = new Map();

  let arr;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');
    if (line.startsWith('mask')) {
      arr = parts[2].split('');
    } else {
      const key = parseInt(parts[0].split('[')[1], 10)
      const val = Number(parts[2]).toString(2);
 
      const mask = arr.slice();
      for (let i = mask.length - 1, j = val.length - 1; i >= 0; i--, j--) {
        if (mask[i] == 'X') {
          if (j >= 0) {
            mask[i] = val[j];
          } else {
            mask[i] = '0';
          }
        }
      }
      
      map.set(key, parseInt(mask.join(''), 2));
    }
  });

  return [...map.values()].reduce((a, b) => a + b);
}
