function B(input) {
  let res = 0;

  input.split('\n').forEach(line => {
    const parts = line.split(' ');  
    const [a, b] = parts[0].split('-').map(num => Number(num)).map(num => parts[2][num - 1]);
    
    const char = parts[1][0];

    if ((a == char) ^ (b == char)) {
      res++;
    }
  });

  return res;
}
