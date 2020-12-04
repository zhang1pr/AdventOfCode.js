function B(input) {
  let res = 0;
  const set = new Set();

  input.split('\n').forEach(line => {
    if (line) {
      const parts = line.split(' ').map(pair => pair.split(':'));

      for (const [a, b] of parts) {
        const n = parseInt(b);
        let f = false;

        if (
          (a == 'byr' && n >= 1920 && n <= 2002)
          || (a == 'iyr' && n >= 2010 && n <= 2020)
          || (a == 'eyr' && n >= 2020 && n <= 2030)
          || (a == 'hgt' && (
            b.includes('cm') && n >= 150 && n <= 193
            || b.includes('in') && n >= 59 && n <= 76
            ))
          || (a == 'hcl' && b.match(/^#[0-9a-z]{6}$/))
          || (a == 'ecl' && 'amb blu brn gry grn hzl oth'.split(' ').includes(b))
          || (a == 'pid' && b.match(/^[0-9]{9}$/))
          || a == 'cid'
        ) {
          set.add(a);
        }
      }
    } else {
      if (set.size == 8 || set.size == 7 && !set.has(`cid`)) {
        res++;
      }

      set.clear();
    }
  })

  return res;
}
