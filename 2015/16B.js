function B(input) {
  const items = [];

  input.split('\n').forEach(sue => {
    const map = new Map();

    parts = sue.split(' ');
    map.set(parts[2].slice(0, parts[2].length-1), parseInt(parts[3].slice(0, parts[3].length-1), 10));
    map.set(parts[4].slice(0, parts[4].length-1), parseInt(parts[5].slice(0, parts[3].length-1), 10));
    map.set(parts[6].slice(0, parts[6].length-1), parseInt(parts[7], 10));
    items.push(map);
  });

  const tape = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  }

  for (let i = 0; i < items.length; i++) {
    const sue = [...items[i]];

    for (let j = 0; j < 3; j++) {
      sueItem = sue[j];

      if (sueItem[0] === 'cats' || sueItem[0] === 'trees') {
        if (tape[sueItem[0]] >= sueItem[1]) {
          break;
        }
      } else if (sueItem[0] === 'pomeranians' || sueItem[0] === 'goldfish') {
        if (tape[sueItem[0]] <= sueItem[1]) {
          break;
        }
      } else {
        if (tape[sueItem[0]] !== sueItem[1]) {
          break;
        }
      }

      if (j === sue.length - 1) {
        return i+1;
      }
    }
  }
}
