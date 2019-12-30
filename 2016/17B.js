function B(input) {
  // Import SparkMD5
  // https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.js
  // https://cdnjs.cloudflare.com/ajax/libs/spark-md5/2.0.2/spark-md5.min.js

  const directions = ['U', 'D', 'L', 'R'];
  let queue = [[input, [0, 0]]];
  let path;

  while (queue.length > 0) {
    const target = queue.shift();
    const string = target[0];
    const position = target[1];
    const hash = SparkMD5.hash(string).slice(0, 4);

    for (let i = 0; i < hash.length; i++) {
      const direction = directions[i];

      if (hash[i] > 'a') {
        switch(direction) {
          case 'U':
            newPosition = [position[0], position[1] - 1];
            break;
          case 'D':
            newPosition = [position[0], position[1] + 1];
            break;
          case 'L':
            newPosition = [position[0] - 1, position[1]];
            break;
          case 'R':
            newPosition = [position[0] + 1, position[1]];
        }

        if (newPosition.toString() === '3,3') {
          path = (string + direction).slice(input.length);
        } else {
          if (
            newPosition[0] >= 0 && newPosition[0] <= 3
            && newPosition[1] >= 0 && newPosition[1] <= 3
          ) {
            queue.push([string + direction, newPosition]);
          }
        }
      }
    }
  }

  return path.length;
}
