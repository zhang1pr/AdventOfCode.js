function B(input) {
  const rooms = [];

  input.split('\n').forEach(string => {
    const parts = string.split('-');

    const code = parseInt(parts[parts.length-1].slice(0,3), 10);
    const name = parts.slice(0, parts.length-1)

    rooms.push([name, code]);
  });

  for (const room of rooms) {
    const name = room[0];
    const times = room[1]%26;

    const newName = name.map(word => {
      return [...word].map(letter => {
        let charCode = letter.charCodeAt(0) + times;
        charCode = charCode > 122 ? charCode - 26 : charCode;

        return String.fromCharCode(charCode);
      }).join('');
    });

    if (newName.includes('northpole')) {
      return room[1];
    }
  }
}
