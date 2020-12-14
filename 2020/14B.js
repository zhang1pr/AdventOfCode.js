function B(input) {
  const map = new Map();

  let arr;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');
    if (line.startsWith('mask')) {
      arr = parts[2].split('');
    } else {
      const key = parseInt(parts[0].split('[')[1], 10).toString(2);
      const val = Number(parts[2]);

      const mask = arr.slice();
      const bit = [];
      for (let i = mask.length - 1, j = key.length - 1; i >= 0; i--, j--) {
        if (mask[i] == 'X') {
          bit.push(i);
        }

        if (mask[i] == '0') {
          if (j >= 0) {
            mask[i] = key[j];
          } else {
            mask[i] = '0';
          }
        }
      }
    
      for (let i = 0; i < 2 ** bit.length; i++) {
        const float = i.toString(2).padStart(bit.length, '0');

        for (let i = 0; i < bit.length; i++) {
          mask[bit[i]] = float[i];
        }

        map.set(parseInt(mask.join(''), 2), val);
      }
    }
  });

  return [...map.values()].reduce((a, b) => a + b);
}
