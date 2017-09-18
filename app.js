new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turn = []
    },
    attack() {
      const damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: `Player gave Monster the damage of ${damage}`
      })
      if (this.checkWin()) {
        return
      }
      this.monsterAttack()
    },
    specialAttack() {
      const damage = this.calculateDamage(10, 20)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: `Player gave Monster the special damage of ${damage}`
      })
      if (this.checkWin()) {
        return
      }
      this.monsterAttack()
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10
      } else {
        this.playerHealth = 100
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player healed and gained 10 health'
      })
      this.monsterAttack()
    },
    giveUp() {
      this.gameIsRunning = false
      this.turns = []
    },
    monsterAttack() {
      const damage = this.calculateDamage(5, 12)
      this.playerHealth -= damage
      this.turns.unshift({
        isPlayer: false,
        text: `Monster gave Player the damage of ${damage}`
      })
      this.checkWin()
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! Do you want to play a new game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! Do you want to play a new game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      }
      return false
    }
  }
})