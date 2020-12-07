function A(input) {
  const map = new Map();
  const set = new Set();

  let res = 0;
  let arr = ['shiny gold'];

  input.split('\n').forEach(line => {
    const parts = line.split('contain ');
    const from = parts[0].split(' bag')[0];
    const to = parts[1].split(', ').map(part => part.split(' bag')[0].split(' ').slice(1).join(' '));

    for (const bag of to) {
      if (!map.has(bag)) {
        map.set(bag, []);
      }

      map.get(bag).push(from);
    }
  });
   
  while (arr.length) {
    let newArr = [];

    for (const item of arr) {
      const get = map.get(item) || []; 

      for (const to of get) {
        if (!set.has(to)) {
          set.add(to);
          res++;
        }

        newArr.push(to);
      }
    }

    arr = newArr;
  }

  return res;
}
