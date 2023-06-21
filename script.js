// QUERY SELECTORS
const playBtn = document.querySelector('.play-btn');
const feedBtn = document.querySelector('.feed-btn');
const bedBtn = document.querySelector('.bed-btn');
const startBtn = document.querySelector('.start-btn');
const playAgainBtn = document.querySelectorAll('.play-again-btn');

// SCORES
const boredScore = document.querySelector('.bored-score');
const hungerScore = document.querySelector('.hunger-score');
const sleepinessScore = document.querySelector('.sleepiness-score');

// TAMAGOTCHI OBJECT
const tamagotchi = {
  bored: 0,
  hunger: 0,
  sleepiness: 0,
  emotions: {
    happy: "url('https://i.imgur.com/xPMy48I.jpg')",
    bothered: "url('https://i.imgur.com/yJcMJfs.jpg')",
    eating: "url('https://i.imgur.com/5oL3H8N.jpg')",
    playing: "url('https://i.imgur.com/xPMy48I.jpg')",
    sleeping: "url('https://i.imgur.com/edsrXmy.jpg')",
    gameOver: "url('https://i.imgur.com/aylUGU8.jpg')",
  },
  iLive() {
    // bored timer
    const boredInterval = setInterval(() => { this.bored += 1 }, 1000);
    // hungry timer
    const hungryInterval = setInterval(() => { this.hunger += 2 }, 5000);
    // sleepy timer
    const sleepyInterval = setInterval(() => { this.sleepiness += 14 }, 10000);
    // condition timer
    const conditionInterval = setInterval(() => {
      boredScore.innerText = this.bored;
      hungerScore.innerText = this.hunger;
      sleepinessScore.innerText = this.sleepiness;
    }, 16.7);

    // alive timer
    const aliveInterval = setInterval(() => {
      // check if tamagotchi is about to die
      if (this.hunger > 50 || this.bored > 50 || this.sleepiness > 50) {
        // DOM to flip-table
        document.querySelector('.tamagotchi').style.backgroundImage = this.emotions.gameOver;
      } else if (this.hunger > 30 || this.bored > 30 || this.sleepiness > 30) {
        // dom to bothered
        document.querySelector('.tamagotchi').style.backgroundImage = this.emotions.bothered;
      } else {
        // dom to happy
        document.querySelector('.tamagotchi').style.backgroundImage = this.emotions.happy;
      }

      // check if the tamagotchi is alive
      if (this.hunger >= 60 || this.bored >= 60 || this.sleepiness >= 60) {
        // DOM to flip-table
        document.querySelector('.modal-tamagotchi').style.backgroundImage = this.emotions.gameOver;
        clearInterval(winGame);
        clearInterval(boredInterval);
        clearInterval(hungryInterval);
        clearInterval(sleepyInterval);
        clearInterval(conditionInterval);
        clearInterval(aliveInterval);
        // the reset
        document.querySelector('.modal').style.display = "flex";
        this.bored = 0;
        this.hunger = 0;
        this.sleepiness = 0;
        document.querySelector('.tamagotchi').style.backgroundImage = this.emotions.happy;
      }
    }, 1000);

    // game win timer
    const winGame = setTimeout(() => {
      document.querySelector('.win-modal').style.display = "flex";
      clearInterval(boredInterval);
      clearInterval(hungryInterval);
      clearInterval(sleepyInterval);
      clearInterval(conditionInterval);
      clearInterval(aliveInterval);
      // the reset
      document.querySelector('.modal').style.display = "flex";
      this.bored = 0;
      this.hunger = 0;
      this.sleepiness = 0;
      document.querySelector('.tamagotchi').style.backgroundImage = this.emotions.happy;
    }, 60000);
  },
  feedMe() {
    if (this.hunger > 0) {
      this.hunger -= 1;
    }
  },
  playWithMe() {
    if (this.bored > 0) {
      this.bored -= 1;
      this.hunger += 2;
    }
  },
  sendMeToBed() {
    if (this.sleepiness > 0) {
      this.sleepiness -= 1;
    }
  },
};

// starting the game
const start = () => {
  tamagotchi.iLive();
  document.querySelector('.modal').style.display = "none";
  document.querySelector('.win-modal').style.display = "none";
};

// DOM change Tamagotchi based on button clicks && goes back to happy after setTimeout
const eating = () => {
  document.querySelector('.tamagotchi').style.backgroundImage = tamagotchi.emotions.eating;
};

const sleeping = () => {
  document.querySelector('.tamagotchi').style.backgroundImage = tamagotchi.emotions.sleeping;
};

const playing = () => {
  document.querySelector('.tamagotchi').style.backgroundImage = tamagotchi.emotions.playing;
};

// EVENT LISTENERS
startBtn.addEventListener("click", start);
playAgainBtn.forEach((btn) => {
  btn.addEventListener("click", start);
});

feedBtn.addEventListener("click", () => {
  tamagotchi.feedMe();
  eating();
});

playBtn.addEventListener("click", () => {
  tamagotchi.playWithMe();
  playing();
});

bedBtn.addEventListener("click", () => {
  tamagotchi.sendMeToBed();
  sleeping();
});
