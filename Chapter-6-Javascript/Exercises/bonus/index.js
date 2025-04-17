// Get elements from the page
const rgbValue = document.getElementById("rgbValue");
const colorOptions = document.querySelectorAll(".color-option");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const replayBtn = document.getElementById("replayBtn");

let score = 0;
let lives = 3;
let correctColor = "";

// Function to create a random RGB color
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256); // red 0-255
  const g = Math.floor(Math.random() * 256); // green 0-255
  const b = Math.floor(Math.random() * 256); // blue 0-255
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to set up a round
function setColorOptions() {
  // Generate the correct color and show it
  correctColor = generateRandomColor();
  rgbValue.textContent = correctColor.toUpperCase();

  // Pick one of the buttons randomly to be the correct answer
  const correctIndex = Math.floor(Math.random() * colorOptions.length);
  colorOptions.forEach((button, index) => {
    if (index === correctIndex) {
      button.style.backgroundColor = correctColor;
    } else {
      button.style.backgroundColor = generateRandomColor();
    }
  });
}

// Start first round
setColorOptions();

// Add click listeners to each button
colorOptions.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedColor = getComputedStyle(button).backgroundColor;

    // Check if the selected color is correct
    if (selectedColor === correctColor) {
      score++;
      alert("✅ Correct!");
    } else {
      lives--;
      alert("❌ Incorrect!");
    }

    // Update score/lives display
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;

    // If game over
    if (lives === 0) {
      alert(`Game Over! Your final score is ${score}`);
      replayBtn.style.display = "block";
    } else {
      setColorOptions(); // Continue the game
    }
  });
});

// Replay button logic
replayBtn.addEventListener("click", () => {
  score = 0;
  lives = 3;
  scoreDisplay.textContent = `Score: ${score}`;
  livesDisplay.textContent = `Lives: ${lives}`;
  replayBtn.style.display = "none";
  setColorOptions(); // Restart game
});
