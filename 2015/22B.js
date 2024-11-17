const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  const instant = [[53, 4, 0], [73, 2, 2]];
  const effect = [[113, 6, 7, 0, 0], [173, 6, 0, 3, 0], [229, 5, 0, 0, 101]];

  let [bossHP, bossATK] = readword(input).map(a => Number(a.split(': ')[1]));
  let myHP = 50, myMana = 500, myArmor = 0, res = Infinity;

  let q = [[bossHP, myHP, myMana, myArmor, true, 0, []]];

  function applyInstant(bossHP, myHP, myMana, myArmor, isMyTurn, manaUsed, effects) {
    let arr = [];

    for (let [cost, damage, heal] of instant) {
      let [nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed] = [bossHP, myHP, myMana, myArmor, isMyTurn, manaUsed];
      nmyMana -= cost;
      if (nmyMana < 0) continue;

      nbossHP -= damage;
      nmyHP += heal;
      nmanaUsed += cost;

      if (nbossHP <= 0)
        res = Math.min(res, nmanaUsed);
      else if (nmanaUsed < res)
        arr.push([nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed, effects]);
    }

    return arr;
  }

  function applyEffect(bossHP, myHP, myMana, myArmor, isMyTurn, manaUsed, effects) {
    let arr = [];
    let canCastArmor = true, canCastDamage = true, canCastMana = true;

    for (let [timer, armor, damage, mana] of effects) {
      canCastArmor &&= (armor == 0);
      canCastDamage &&= (damage == 0);
      canCastMana &&= (mana == 0);
    }

    let can = [canCastArmor, canCastDamage, canCastMana];

    for (let i = 0; i < 3; i++) {
      let flag = can[i];
      if (flag == false) continue;
      let [cost, timer, armor, damage, mana] = effect[i];

      if (myMana < cost) continue;

      let [nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed] = [bossHP, myHP, myMana, myArmor, isMyTurn, manaUsed];

      let neffects = effects.map(a => a.slice());
      nmyMana -= cost;
      nmanaUsed += cost;

      if (nmanaUsed < res) {
        neffects.push([timer, armor, damage, mana]);
        arr.push([nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed, neffects]);
      }
    }

    return arr;
  }

  while (q.length) {
    let nq = [];

    for (let [bossHP, myHP, myMana, myArmor, isMyTurn, manaUsed, effects] of q) {
      if (isMyTurn) {
        myHP--;
        if (myHP == 0) continue;
      }

      let [nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed] = [bossHP, myHP, myMana, myArmor, isMyTurn, manaUsed];
      nisMyTurn = !isMyTurn;

      let neffects = [];
      for (let [timer, armor, damage, mana] of effects) {
        let ntimer = timer - 1;

        if (ntimer == 0 && armor) {
          nmyArmor -= armor;
        }

        if (ntimer == 5 && armor) {
          nmyArmor += armor;
        }

        nbossHP -= damage;
        nmyMana += mana;

        if (ntimer > 0) neffects.push([ntimer, armor, damage, mana]);
      }

      if (nbossHP <= 0) {
        res = Math.min(res, nmanaUsed);
        continue;
      }

      if (isMyTurn) {
        for (let state of applyInstant(nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed, neffects))
          nq.push(state);

        for (let state of applyEffect(nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed, neffects))
          nq.push(state);
      } else {
        nmyHP -= Math.max(bossATK - nmyArmor, 1);
        if (nmyHP <= 0) continue;

        nq.push([nbossHP, nmyHP, nmyMana, nmyArmor, nisMyTurn, nmanaUsed, neffects]);
      }
    }

    q = nq;
  }

  return res;
}