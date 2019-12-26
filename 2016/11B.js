function B(input) {
    const floors = [];
    let steps = 0;

    input.split('\n').forEach(line => {
      let count = 0;

      const generatorRegex = /\w+ generator/g;
      const microchipRegex = /\w+-\w+ microchip/g;

      let generators = line.match(generatorRegex) || [];
      let microchips = line.match(microchipRegex) || [];

      count += generators.length + microchips.length;

      floors.push(count);
    });

    floors[0] += 4;
    const total = floors.reduce((prev, curr) => prev + curr);
    let elevator = Math.min(floors[0], 2);
    let floor = 0;
    floors[0] -= elevator;

    while (floors[3] + 1 !== total) {
      while (elevator < 2 && floor > 0) {
        floor--;
        const carry = Math.min(floors[floor], 2 - elevator);

        if (carry > 0) {
          elevator += carry;
          floors[floor] -= carry;
        }

        steps++;
      }

      while (floor < 3) {
        floor++;
        const carry = Math.min(floors[floor], 2 - elevator);

        if (carry > 0) {
          elevator += carry;
          floors[floor] -= carry;
        }

        steps++;
      }

      floors[3] += 1;
      elevator--;
    }

    return steps;
  }
