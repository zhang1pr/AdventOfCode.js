function B(input) {
  const nums = input.split('\n').map(num => Number(num));

  nums.sort((a, b) => a - b);
      
  for (let i = 0; i < nums.length; i++) { 
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      if (nums[left] + nums[right] + nums[i] == 2020) {
        return nums[left] * nums[right]  * nums[i];
      } else if (nums[left] + nums[right] + nums[i] < 2020) {
        left++;
      } else {
        right--;
      }   
    }
  }
};

