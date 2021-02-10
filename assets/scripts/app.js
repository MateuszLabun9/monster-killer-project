const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSETR_ATTACK";
const LOG_EVENT_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";



let battleLog = [];
let lastLoggedEntry;

function getMaxLife (){
  const enteredValue = prompt("Mximum life for you and monster.", "100");

  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw {message: 'Invalid user input, not a number'}
  }
  return parsedValue;
}


let choosenMaxLife;

try {
  choosenMaxLife = getMaxLife();
}catch (error){
  console.log(error);
  choosenMaxLife = 100;
} 



let currentMonsterHealth = choosenMaxLife;
let currentPlayerHelath = choosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(choosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event : event,
    value : value,
    finalMonsterHealth : monsterHealth,
    finalPlayerHeal : playerHealth
  };

  switch(event){ // zawsze uzywa === gdy porównuje ! 
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry = {
        event: event,
        value: value,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHeal: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK :
      logEntry = {
        event: event,
        value: value,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHeal: playerHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK :
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHeal: playerHealth,
      };
      break;
    case LOG_EVENT_HEAL :
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHeal: playerHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER :
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHeal: playerHealth,
      };
      break;
    default : 
      logEntry = {};
  }


  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = choosenMaxLife;
  currentPlayerHelath = choosenMaxLife;
  resetGame(choosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHelath;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHelath -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHelath
  );

  if (currentPlayerHelath <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHelath = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("Bonus life saved you !");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHelath > 0) {
    alert("YOU WON ! ");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER_WON",
      currentMonsterHealth,
      currentPlayerHelath
    );
    reset();
  } else if (currentPlayerHelath <= 0 && currentMonsterHealth > 0) {
    alert("YOU LOST ! ");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Monster WON",
      currentMonsterHealth,
      currentPlayerHelath
    );

    reset();
  } else if (currentPlayerHelath <= 0 && currentMonsterHealth <= 0) {
    alert("You have a DRAW !");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "YOU HAVE A DRAW",
      currentMonsterHealth,
      currentPlayerHelath
    );
    reset();
  }
}

function attackMonster(value) {
  //wyrazenie warunkowe
  const maxDamage = value === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent =
    value === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  /* if (value === MODE_ATTACK){
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  }
  else if (value === MODE_STRONG_ATTACK){
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  }
 */
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHelath);
  endRound();
}

function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHelath >= choosenMaxLife - HEAL_VALUE) {
    alert("Can't heal more than max HP");
    healValue = choosenMaxLife - currentPlayerHelath;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHelath += healValue;

  writeToLog(logEvent, healValue, currentMonsterHealth, currentPlayerHelath);

  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++){
    console.log('-------');
  }
  /* for (let i = 0; i < battleLog.length; i++)
  {
    console.log(battleLog[i]);
  }
   */
    let i =0;
   for (const logEntry of battleLog){
     if ( ! lastLoggedEntry && lastLoggedEntry!== 0|| lastLoggedEntry < i){
      console.log(`#${i}`);
      for ( const key in logEntry){
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break; // zatrzymuje sie zaawsze wtedy gdy wpiszemy cokolwiek do konsoli
     }
      i++;
      
   }

  
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
