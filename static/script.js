// Get the clock and date elements
const clockElement = document.getElementById("clock");
const dateElement = document.getElementById("date");

// Function to toggle visibility of clock and date
function toggleVisibility() {
  const isVisible = clockElement.style.display !== "none"; // Check current visibility

  // Toggle visibility
  clockElement.style.display = isVisible ? "none" : "block";
  dateElement.style.display = isVisible ? "none" : "block";
}

// Event listener for key press
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is 'H' or 'h'
  if (event.key.toLowerCase() === "h") {
    toggleVisibility(); // Toggle visibility when 'H' key is pressed
  }
});

// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const min = 0; // Minimum value (inclusive)
const max = 255; // Maximum value (inclusive)

// Define color transition variables
let red = Math.floor(Math.random() * (max - min + 1)) + min;
let green = Math.floor(Math.random() * (max - min + 1)) + min;
let blue = Math.floor(Math.random() * (max - min + 1)) + min;
let delta = 1; // Change in color value
let increasing = true; // Direction of color change

let angle = 0; // Initial angle of the gradient

let timeoutId; // Variable to store the timeout ID

if ([red, green, blue].filter((number) => number < 128).length >= 2) {
  clockElement.style.color = "white";
  dateElement.style.color = "white";
}

// Function to hide the cursor
function hideCursor() {
  document.body.style.cursor = "none"; // Hide the cursor
}

// Function to show the cursor
function showCursor() {
  document.body.style.cursor = "auto"; // Show the cursor
}

// Event listener for mousemove event
document.addEventListener("mousemove", function () {
  // Clear the previous timeout
  clearTimeout(timeoutId);

  // Show the cursor
  showCursor();

  // Set a new timeout to hide the cursor after 3 seconds of inactivity
  timeoutId = setTimeout(hideCursor, 3000);
});

// Render function to draw the gradient
function render(gradient) {
  // Create a linear gradient
  // const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

  // Set color stops with interpolated values
  gradient.addColorStop(0, `rgb(${red}, ${green}, ${blue})`);
  gradient.addColorStop(1, `rgb(${blue}, ${green}, ${red}`);

  // Fill the canvas with the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Animation loop
function animate() {
  // Update color values based on direction
  if (increasing) {
    red -= delta;
    blue += delta;
  } else {
    red += delta;
    blue -= delta;
  }

  // Check if color values reach the limits
  if (red <= 0 && blue >= 255) {
    increasing = false;
  } else if (red >= 255 && blue <= 0) {
    increasing = true;
  }

  angle += 0.005; // Adjust the speed of angle change as desired

  // Calculate the new coordinates based on the angle
  const startX = (Math.cos(angle) * canvas.width) / 2;
  const startY = (Math.sin(angle) * canvas.height) / 2;
  const endX = (Math.cos(angle + Math.PI) * canvas.width) / 2;
  const endY = (Math.sin(angle + Math.PI) * canvas.height) / 2;

  // Create gradient with updated coordinates
  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);

  // Render the gradient
  render(gradient);

  // Call animate function recursively at 30 fps
  setTimeout(animate, 1000 / 30);
}

// Start the animation
animate();

// Update clock function
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const clockDisplay = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").textContent = clockDisplay;

  // Get the date and weekday
  const dateDisplay = `${now.toDateString()}`;

  // Update the date display
  document.getElementById("date").textContent = dateDisplay;

  setTimeout(updateClock, 1000); // Update every second
}

// Start updating the clock
updateClock();
