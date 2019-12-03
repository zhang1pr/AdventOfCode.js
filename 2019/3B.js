function B(input) {
  const lines = {
    line1: [['U',0]],
    line2: [['U',0]]
  };

  let point;
  const points1 = [];
  const points2 = [];
  let intersectionIndice = [];
  let intersections = [];
  let steps = Infinity;

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
          if (Math.abs(point1a[0]) + Math.abs(point2a[1]) !== 0 && !intersections.includes([point1a[0], point2a[1]])) {
            intersections.push([point1a[0], point2a[1]]);
            intersectionIndice.push([i, j]);
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
            if (Math.abs(point1a[1]) + Math.abs(point2a[0]) !== 0 && !intersections.includes([point1a[1], point2a[0]])) {
              intersections.push([point2a[0], point1a[1]]);
              intersectionIndice.push([i, j]);
            }
          }
        }
      }
    }
  }

  for (let a = 0; a < intersections.length; a++) {
    const index = intersectionIndice[a];
    let thisSteps1 = 0;
    let thisSteps2 = 0;

    for (let i=0; i<=index[0]; i++) {
      if (i === index[0]) {
        thisSteps1 += Math.abs(points1[i][0] - intersections[a][0]) + Math.abs(points1[i][1] - intersections[a][1]);
      } else {
        thisSteps1 += lines.line1[i+1][1];
      }
    }


    for (let i=0; i<=index[1]; i++) {
      if (i === index[1]) {
        thisSteps2 += Math.abs(points2[i][0] - intersections[a][0]) + Math.abs(points2[i][1] - intersections[a][1]);
      } else {
        thisSteps2 += lines.line2[i+1][1];
      }
    }

    steps = Math.min(steps, thisSteps1 + thisSteps2);
  }

  return steps;
}
