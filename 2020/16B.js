function B(input) {
  const rules = [];
  const tickets = [];
  let flag = false;
  let res = 1;
  let count = 0;
  
  input.split('\n').forEach(line => {
    if (!line) {
      flag = false;
    }

    if (line.includes('-')) {
      count++;
      const parts = line.split(':')[1].split(' ');
      const first = parts[1].split('-').map(a => Number(a));
      const second = parts[3].split('-').map(a => Number(a));
      rules.push([...first, ...second]);
    } else if (flag) {
      const nums = line.split(',').map(a => Number(a));
     
      let validCount = nums.length;
      
      for (const num of nums) {
        let isValid = false;
        for (let [a, b, c, d] of rules) {
          if (a <= num && num <= b || c <= num && num <= d) {
            isValid = true;
            break;
          }
        }

        if (isValid) {
          validCount--;
        }
      }

      if (validCount == 0) {
        tickets.push(nums);
      }
    }

    if (line.startsWith('nearby') || line.startsWith('your')) {
      flag = true;
    }
  });
  
  const sets = [...Array(count)].map(() => new Set([...Array(count)].map((item, idx) => idx)));

  let i = 0;
  while (count) {
    const ticket = tickets[i];

    for (let j = 0; j < ticket.length; j++) {
      for (let k = 0; k < rules.length; k++) {
        const set = sets[k];

        if (set.has(j) && set.size > 1) {
          const [a, b, c, d] = rules[k];
          const num = ticket[j];

          if (!(a <= num && num <= b) && !(c <= num && num <= d)) {
            set.delete(j);

            if (set.size == 1) {
              let targets = [k];

              while (targets.length) {
                const newTargets = [];

                for (const target of targets) {
                  count--;

                  const curSet = sets[target];
                  const val = [...curSet][0];
                  
                  for (let m = 0; m < sets.length; m++) {
                    if (m == target || sets[m].size == 1) {
                      continue;
                    } 
    
                    sets[m].delete(val);

                    if (sets[m].size == 1) {
                      newTargets.push(m);
                    }
                  }
                }

                targets = newTargets;
              }
            }
          }
        }
      }
    }

    i++;
  }  

  const myTicket = tickets[0];
  for (let i = 0; i < 6; i++) {
    const index = [...sets[i]][0];
    res *= myTicket[index];
  }

  return res;
}
