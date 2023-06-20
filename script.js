// Get references to the HTML elements
const nameElement = document.getElementById('name');
const hungerElement = document.getElementById('hunger');
const happinessElement = document.getElementById('happiness');
const cleanlinessElement = document.getElementById('cleanliness');
const healthElement = document.getElementById('health');
const nameInput = document.getElementById('name-input');
const feedButton = document.getElementById('feed-btn');
const playButton = document.getElementById('play-btn');
const sleepButton = document.getElementById('sleep-btn');
const cleanButton = document.getElementById('clean-btn');
const medicButton = document.getElementById('medic-btn');

// Set initial values
let pet = {
  name: '',
  hunger: 100,
  happiness: 100,
  cleanliness: 100,
  health: 100
};

// Function to update the pet's stats in the HTML
function updateStats() {
  nameElement.textContent = pet.name;
  hungerElement.textContent = pet.hunger;
  happinessElement.textContent = pet.happiness;
  cleanlinessElement.textContent = pet.cleanliness;
  healthElement.textContent = pet.health;
}

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to perform random events
function performRandomEvent() {
  const randomEvent = getRandomNumber(1, 4);

  switch (randomEvent) {
    case 1: // Hunger event
      pet.hunger -= getRandomNumber(5, 10);
      break;
    case 2: // Happiness event
      pet.happiness -= getRandomNumber(5, 10);
      break;
    case 3: // Cleanliness event
      pet.cleanliness -= getRandomNumber(5, 10);
      break;
    case 4: // Health event
      pet.health -= getRandomNumber(5, 10);
      break;
    default:
      break;
  }

  updateStats();
}

// Event listener for the Name input field
nameInput.addEventListener('input', function (event) {
  pet.name = event.target.value;
  updateStats();
});

// Event listeners for the action buttons
feedButton.addEventListener('click', function () {
  pet.hunger += 10;
  updateStats();
});

playButton.addEventListener('click', function () {
  pet.happiness += 10;
  updateStats();
});

sleepButton.addEventListener('click', function () {
  pet.health += 10;
  updateStats();
});

cleanButton.addEventListener('click', function () {
  pet.cleanliness += 10;
  updateStats();
});

medicButton.addEventListener('click', function () {
  pet.health += 10;
  updateStats();
});

// Set up random events to occur every few seconds
setInterval(performRandomEvent, 5000);

// Initialize the pet's stats
updateStats();