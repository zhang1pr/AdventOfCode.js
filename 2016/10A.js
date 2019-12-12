function A(input) {
  const map = new Map();
  const instructions = [];

  input.split('\n').forEach(instruction => {
    const parts = instruction.split(' ');

    if (instruction.startsWith('value')) {
      const bot = parseInt(parts[5], 10);
      const chip = parseInt(parts[1], 10);

      if (map.has(bot)) {
        const anotherChip = map.get(bot);
        map.set(bot, [anotherChip, chip]);
      } else {
        map.set(bot, chip);
      }
    } else {
      let bot1 = parseInt(parts[6], 10);
      let bot2 = parseInt(parts[11], 10);

      if (parts[5] === 'output') {
        bot1 = -bot1;
      }

      if (parts[10] === 'output') {
        bot2 = -bot2;
      }

      instructions.push([parseInt(parts[1], 10), bot1, bot2]);
    }
  });

  while (true) {
    for (let instruction of instructions) {
      if (instruction !== '' && map.has(instruction[0]) && map.get(instruction[0]).length === 2) {
        const chips = map.get(instruction[0]);
        const chipLow = chips[0] < chips[1] ? chips[0] : chips[1];
        const chipHigh = chips[0] > chips[1] ? chips[0] : chips[1];

        const botLow = instruction[1];
        const botHigh = instruction[2];

        if (map.has(botLow)) {
          const anotherChip = map.get(botLow);

          if ([chipLow, anotherChip].includes(61) && [chipLow, anotherChip].includes(17)) {
            return botLow;
          }

          map.set(botLow, [anotherChip, chipLow]);
        } else {
          map.set(botLow, chipLow);
        }

        if (map.has(botHigh)) {
          const anotherChip = map.get(botHigh);

          if ([chipHigh, anotherChip].includes(61) && [chipHigh, anotherChip].includes(17)) {
            return botHigh;
          }

          map.set(botHigh, [anotherChip, chipHigh]);
        } else {
          map.set(botHigh, chipHigh);
        }

        map.delete(instruction[0]);

        instruction = '';
      }
    }
  }
}
