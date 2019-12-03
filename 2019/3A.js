function A(input) {
  const lines = {
    line1: [['U',0]],
    line2: [['U',0]]
  };

  let point;
  const points1 = [];
  const points2 = [];
  let distance = Infinity;

  input = input.split('\n').map((line, index) => {
    line.split(',').forEach(move => {
      lines[`line${index+1}`].push([move[0], parseInt(move.slice(1), 10)]);
    });
  });

  point = [0, 0];
  for (let i=0; i<lines.line1.length; i++) {
    switch(lines.line1[i][0]) {
      case 'U':
        point[1] += lines.line1[i][1];
        break;
      case 'D':
        point[1] -= lines.line1[i][1];
        break;
      case 'R':
        point[0] += lines.line1[i][1];
        break;
      case 'L':
        point[0] -= lines.line1[i][1];
        break;
    }

    points1.push(point.slice());
  }

  point = [0, 0];
  for (let i=0; i<lines.line2.length; i++) {
    switch(lines.line2[i][0]) {
      case 'U':
        point[1] += lines.line2[i][1];
        break;
      case 'D':
        point[1] -= lines.line2[i][1];
        break;
      case 'R':
        point[0] += lines.line2[i][1];
        break;
      case 'L':
        point[0] -= lines.line2[i][1];
        break;
    }

    points2.push(point.slice());
  }

  for (let i=0; i<points1.length-1; i++) {
    for (let j=0; j<points2.length-1; j++) {
      const point1a = points1[i];
      const point1b = points1[i+1];
      const point2a = points2[j];
      const point2b = points2[j+1];

      if (
        (point1a[0] <= point2a[0] && point1a[0] >= point2b[0])
        || (point1a[0] >= point2a[0] && point1a[0] <= point2b[0])
      ) {
        if (
          (point2a[1] <= point1a[1] && point2a[1] >= point1b[1])
          || (point2a[1] >= point1a[1] && point2a[1] <= point1b[1])
        ) {
          if (Math.abs(point1a[0]) + Math.abs(point2a[1]) !== 0) {
            distance = Math.min(distance, Math.abs(point1a[0]) + Math.abs(point2a[1]));
          }
        }
      } else {
        if (
          (point1a[1] <= point2a[1] && point1a[1] >= point2b[1])
          || (point1a[1] >= point2a[1] && point1a[1] <= point2b[1])
        ) {
          if (
            (point2a[0] <= point1a[0] && point2a[0] >= point1b[0])
            || (point2a[0] >= point1a[0] && point2a[0] <= point1b[0])
          ) {
            if (Math.abs(point1a[1]) + Math.abs(point2a[0]) !== 0) {
              distance = Math.min(distance, Math.abs(point1a[1]) + Math.abs(point2a[0]));
            }
          }
        }
      }
    }
  }

  return distance;
}
