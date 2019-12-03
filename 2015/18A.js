function A(input) {
  let array = [];
  let newArray = [];

  input.split('\n').forEach(lights => {
    const line = [];

    for (let i = 0; i < lights.length; i++) {
      if (lights[i] === '#') {
        line.push(true);
      } else {
        line.push(false);
      }
    }

    array.push(line);
    newArray.push(line.slice());
  });

  let times = 100;

  while (times > 0) {
    times--;

    for (let i=0; i < array.length; i++) {
      for (let j=0; j < array[i].length; j++) {
        let expectedCount;
        let actualCount = 0;
        if (array[i][j]) {
          expectedCount = 2.5 + 1;
        } else {
          expectedCount = 3;
        }

        for (let a=-1; a< 2; a++) {
          for (let b=-1; b< 2; b++) {
            if (array[i+a] !== undefined) {
              if (array[i+a][j+b] === true) {
                actualCount += 1;
              }
            }
          }
        }

        if (Math.abs(expectedCount - actualCount) < 1) {
          newArray[i][j] = true;
        } else {
          newArray[i][j] = false;
        }
      }
    }

    array = JSON.parse(JSON.stringify(newArray));
  }

  return array.reduce((prev, curr) => {
    return prev + curr.reduce((x, y) => {
      return x + (y ? 1 : 0);
    }, 0);
  }, 0);
}
