function A(input) {
  let res = 0;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');  
    const [a, b] = parts[0].split('-').map(a => Number(a));
    
    const char = parts[1][0];

    let count = 0;
    for (const ch of parts[2]) {
      if (ch == char) {
        count++;
      }
    }

    if (count >= a && count <= b) {
      res++;
    }
  });

  return res;
}
