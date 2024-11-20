const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);
  let group1 = [], group2 = [];

  for (let group of arr) {
    if (group.endsWith(':')) continue;
    if (!group) {
      group1 = group2;
      group2 = [];
      continue;
    }

    let nums = readnum(group);

    let special = (group.match(/\((.*)\)/) || [])[1];
    let damageType = group.match(/(\w*) damage/)[1];
    let sparr = [];

    if (special) {
      let specialType = special.split('; ');

      for (let text of ['immune to ', 'weak to ']) {
        let cur = [];

        for (let type of specialType) {
          if (type.startsWith(text)) {
            cur = type.slice(text.length).split(', ');
          }
        }

        sparr.push(cur);
      }
    } else {
      sparr = [[], []];
    }

    group2.push([nums, sparr, damageType]);
  }

  let targetSort = ([[u1, hp1, d1, init1]], [[u2, hp2, d2, init2]]) => {
    let p1 = u1 * d1, p2 = u2 * d2;

    if (p1 != p2) return p2 - p1;
    return init2 - init1;
  };

  while (group1.length && group2.length) {
    group1.sort(targetSort);
    group2.sort(targetSort);

    let group1Targets = [], group2Targets = [];

    for (let unit of group1)
      group1Targets.push(chooseTarget(unit, group2, group1Targets));

    for (let unit of group2)
      group2Targets.push(chooseTarget(unit, group1, group2Targets));

    let arr = [];
    for (let i = 0; i < group1.length; i++)
      arr.push([group1[i][0][3], i, 1]);
    for (let i = 0; i < group2.length; i++)
      arr.push([group2[i][0][3], i, 2]);

    arr.sort((a, b) => b[0] - a[0]);

    for (let [init, index, groupNum] of arr) {
      let enemyIndex = groupNum == 1 ? group1Targets[index] : group2Targets[index];
      if (enemyIndex == -1) continue;

      let cur = groupNum == 1 ? group1 : group2, enemy = groupNum == 1 ? group2 : group1;
      let [[u1, hp1, d1, init1], [immune1, weak1], damageType1] = cur[index];
      let [[u2, hp2, d2, init2], [immune2, weak2], damageType2] = enemy[enemyIndex];

      if (u1 < 0) continue;

      let damage = calcDamage(u1 * d1, damageType1, immune2, weak2);

      enemy[enemyIndex][0][0] -= Math.floor(damage / hp2);
    }

    group1 = group1.filter(a => a[0][0] > 0);
    group2 = group2.filter(a => a[0][0] > 0);
  }

  let group = group1.length ? group1 : group2;

  for (let [[unit]] of group)
    res += unit;

  return res;
}

function chooseTarget(unit, enemy, targets) {
  let [nums, sparr, damageType] = unit;
  let power = nums[0] * nums[2];

  let maxDamage = 0, enemyChoice = -1, enemyDamage, enemyInit;

  for (let i = 0; i < enemy.length; i++) {
    let [[u, hp, d, init], [immune, weak]] = enemy[i];
    if (targets.includes(i)) continue;

    let damage = calcDamage(power, damageType, immune, weak);

    if (damage > maxDamage) {
      maxDamage = damage;
      enemyChoice = i;
      enemyInit = init;
      enemyDamage = u * d;
    } else if (damage == maxDamage) {
      if (enemyDamage < u * d) {
        enemyChoice = i;
        enemyInit = init;
        enemyDamage = u * d;
      } else if (enemyDamage == u * d && enemyInit < init) {
        enemyChoice = i;
        enemyInit = init;
      }
    }
  }

  return enemyChoice;
}

function calcDamage(power, damageType, immune, weak) {
  if (immune.includes(damageType)) return 0;
  if (weak.includes(damageType)) return power * 2;

  return power;
}

console.log(solve(input));