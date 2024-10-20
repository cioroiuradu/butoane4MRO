// Get the target date from localStorage or set a new default
let targetDate = localStorage.getItem("targetDate")
  ? new Date(localStorage.getItem("targetDate")).getTime()
  : new Date("2024-11-10T13:00:00").getTime(); // Default date

let countdownEnded = localStorage.getItem("countdownEnded") === "true"; // Check if the countdown has ended

// Fireworks setup (Confetti.js)
function launchFireworks() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }, // Adjust this to control where the confetti starts
  });
}

// Update title and countdown numbers if the countdown has ended
if (countdownEnded) {
  document.querySelector(".title-text").innerHTML =
    "GLUMA CU BUTOANELE A FOST SPUSĂ.";
  // Set countdown numbers to 00
  document.getElementById("days").innerHTML = "00";
  document.getElementById("hours").innerHTML = "00";
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";
  launchFireworks(); // Start fireworks if countdown already ended
}

// Function to update the countdown
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Check if the countdown has ended
  if (distance < 0 && !countdownEnded) {
    clearInterval(x);
    countdownEnded = true; // Set the flag to true
    localStorage.setItem("countdownEnded", "true"); // Save the state in localStorage
    // Keep countdown numbers at 00
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
    document.querySelector(".title-text").innerHTML =
      "GLUMA CU BUTOANELE A FOST SPUSĂ.";

    // Trigger fireworks
    launchFireworks();
    return; // Exit the function to prevent further updates
  }

  // Only calculate time if the countdown hasn't ended
  if (!countdownEnded) {
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the display
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML =
      hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML =
      seconds < 10 ? "0" + seconds : seconds;
  }
}

// Call updateCountdown immediately to set initial values
updateCountdown();

// Update the countdown every 1 second
const x = setInterval(updateCountdown, 1000);

// Function to set a new target date
function setNewDate(newDate) {
  targetDate = new Date(newDate).getTime(); // Update the target date
  localStorage.setItem("targetDate", newDate); // Save the new target date to localStorage
  countdownEnded = false; // Reset the countdown end flag
  localStorage.setItem("countdownEnded", "false"); // Reset in localStorage

  // Update the title back to the original
  document.querySelector(".title-text").innerHTML =
    "URMĂTOAREA GLUMĂ CU BUTOANELE VA FI ÎN:";

  // Update countdown numbers
  updateCountdown();
}
