function B(input) {
  const map = new Map();

  let res = 0;
  let count = 0;
  
  input.split('\n').forEach(line => {
    if (!line) {
      for (const val of map.values()) {
        if (val == count) {
          res++;
        }
      }
      count = 0;

      map.clear();
    } else {
      count++;

      const parts = line.split('');  
      
      for (const ch of parts) {
        map.set(ch, (map.get(ch) || 0) + 1);
      }
    }
  });
  
  for (const val of map.values()) {
    if (val == count) {
      res++;
    }
  }

  return res;
}
