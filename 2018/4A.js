function A(input) {
  const dayMap = new Map();
  const sleepMap = new Map();
  const robotMap = new Map();

  input.split('\n').forEach(line => {
    const parts = line.split(' ');
    let day = parts[0].split('1518-')[1];
    const hour = parts[1].split(':')[0];

    if (hour === '23') {
      const date = new Date(day);
      date.setDate(date.getDate()+1);
      let m = date.getMonth()+1;
      let d = date.getDate();

      day = `${('0'+m.toString()).substr(-2)}-${('0'+d.toString()).substr(-2)}`;
      line = line.slice(0, 12) + '00:00' + line.slice(17);
    }

    if (!dayMap.has(day)) {
      dayMap.set(day, [line]);
    } else {
      array = dayMap.get(day);
      array.push(line);

      array.sort((a,b) => {
        return a.slice(15,17) - b.slice(15,17);
      });

      dayMap.set(day, array);
    }
  });

  for (const lines of dayMap.values()) {
    let robot;
    let start;
    let end;

    for (const line of lines) {
      const parts = line.split(' ');
      const time = parseInt(parts[1].split(':')[1], 10);

      if (parts[3].startsWith('#')) {
        robot = parts[3].slice(1);
      } else if (parts[2] === 'falls') {
        start = time;
      } else if (parts[2] === 'wakes') {
        end = time;

        while (start < end) {
          const string = robot + ',' + start.toString();

          if (!sleepMap.has(string)) {
            sleepMap.set(string, 1);
          } else {
            sleepMap.set(string, sleepMap.get(string) + 1);
          }

          if (!robotMap.has(robot)) {
            robotMap.set(robot, 1);
          } else {
            robotMap.set(robot, robotMap.get(robot) + 1);
          }
          start++;
        }
      }
    }
  }

  let maxRobot;
  let max = 0;
  for (const [key, value] of robotMap.entries()) {
    if (value > max) {
      max = value;
      maxRobot = key;
    }
  }

  let maxMinute;
  max = 0;
  for (const [key, value] of sleepMap.entries()) {
    if (key.startsWith(maxRobot) && value > max) {
      max = value;
      maxMinute = key.split(',')[1];
    }
  }

  return parseInt(maxRobot, 10) * parseInt(maxMinute, 10);
}
