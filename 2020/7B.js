function B(input) {
  const map = new Map();

  input.split('\n').forEach(line => {
    const parts = line.split('contain ');
 
    if (!line.includes('no other')) {
      const from = parts[0].split(' bag')[0];
      const to = parts[1].split(', ').map(part => part.split(' bag')[0]);
  
      for (const bag of to) {
        if (!map.has(from)) {
          map.set(from, []);
        }
  
        map.get(from).push(bag);
      }
    }
  });
   
  function DFS(count, bag) {
    let res = 0;

    const get = map.get(bag);

    res += count;
    
    if (!get) {
      return res;
    }

    for (const to of map.get(bag)) {
      const parts = to.split(' ');
       
      const num = Number(parts[0]);
      const item = parts.slice(1).join(' ');

      res += DFS(count * num, item);
    }

    return res;
  }

  return DFS(1, 'shiny gold') - 1;
}
