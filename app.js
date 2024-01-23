function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //a draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //a draw
        this.winner = "draw";
      } else if (value <= 0) {
        // monster lost
        this.winner = "player";
      }
    },
  },

  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      if (this.monsterHealth - attackValue < 0) {
        this.monsterHealth = 0;
      } else {
        this.monsterHealth -= attackValue;
      }
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      if (this.playerHealth - attackValue < 0) {
        this.playerHealth = 0;
      } else {
        this.playerHealth -= attackValue;
      }
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      if (this.monsterHealth - attackValue < 0) {
        this.monsterHealth = 0;
      } else {
        this.monsterHealth -= attackValue;
      }
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      const logMessage = {
        actionBy: who,
        actionType: what,
        actionValue: value,
      };

      this.logMessages.unshift(logMessage);
    },
  },
});

app.mount("#game");
