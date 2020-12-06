function A(input) {
  const set = new Set();

  let res = 0;

  input.split('\n').forEach(line => {
    if (!line) {
      res += set.size;
      set.clear();
    }

    const parts = line.split('');  

    for (const ch of parts) {
      set.add(ch);
    }
  });

  res += set.size;

  return res;
}
