function A(number) {
  let layer;
  let i = 1;

  while (true) {
    const targetLayer = 2*i - 1;

    if (targetLayer * targetLayer >= number) {
      layer = i;
      break;
    }

    i += 1;
  }

  let start = (2*i - 3)*(2*i - 3);

  while (!(start <= number && number <= start + 2*i - 2)) {
    start += 2*i - 2;
  }

  const mid = start + i - 1;

  return layer - 1 + Math.abs(number - mid);
}
