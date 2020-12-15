function A(input) {
  const map = new Map();

  const nums = input.split(',').map(a => Number(a));
  let recent;
 
  let i = 0;
  for (; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i], []);
    }

    map.get(nums[i]).push(i);
    recent = nums[i];
  }

  for (; i < 2020; i++) {
    const get = map.get(recent);
    if (get.length == 1) {
      recent = 0;
    } else {
      recent = get[get.length - 1] - get[get.length - 2];
    }

    if (!map.has(recent)) {
      map.set(recent,[]);
    }

    map.get(recent).push(i);
  }

  return recent;
}
