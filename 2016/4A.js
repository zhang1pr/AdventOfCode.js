function A(input) {
  const rooms = [];
  let count = 0;

  input.split('\n').forEach(string => {
    const parts = string.split('-');

    const code = parseInt(parts[parts.length-1].slice(0,3), 10);
    const letters = parts[parts.length-1].slice(4, 9);
    const name = parts.slice(0, parts.length-1).join('');

    rooms.push([name, letters, code]);
  });

  for (const room of rooms) {
    const map = new Map();

    const name = room[0];
    const letters = room[1];
    const code = room[2];

    for (const char of name) {
      if (map.has(char)) {
        map.set(char, map.get(char)+1);
      } else {
        map.set(char, 1);
      }
    }

    let flag = false;

    for (const entry of map) {
      const targetLetter = entry[0];
      const value = entry[1];

      if (letters.includes(targetLetter)) {
        continue;
      }

      for (const letter of letters) {
        if (
          !map.has(letter)
          || map.get(letter) < value
          || (map.get(letter) === value && letter > targetLetter)
        ) {
          flag = true;
          break;
        }
      }

      if (flag) {
        break;
      }
    }

    if (!flag) {
      count += code;
    }
  }

  return count;
}
