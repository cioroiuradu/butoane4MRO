document.addEventListener("DOMContentLoaded", () => {
  // Get the target date from localStorage or set a new default
  let targetDate = localStorage.getItem("targetDate")
    ? new Date(localStorage.getItem("targetDate")).getTime()
    : new Date("2024-11-10T13:00:00").getTime(); // Default date

  // Initialize countdownEnded from localStorage
  let countdownEnded = localStorage.getItem("countdownEnded") === "true";

  // Fireworks setup (Confetti.js)
  function launchFireworks() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  // Check if countdown has ended at the start
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

    // Check if countdown has ended
    if (distance < 0 && !countdownEnded) {
      clearInterval(x);
      countdownEnded = true; // Set the flag to true
      localStorage.setItem("countdownEnded", "true"); // Save to localStorage
      document.querySelector(".title-text").innerHTML =
        "GLUMA CU BUTOANELE A FOST SPUSĂ."; // Change the title
      // Set countdown numbers to 00
      document.getElementById("days").innerHTML = "00";
      document.getElementById("hours").innerHTML = "00";
      document.getElementById("minutes").innerHTML = "00";
      document.getElementById("seconds").innerHTML = "00";

      // Trigger fireworks
      launchFireworks();
      return;
    }

    // Calculate time and update display
    if (!countdownEnded) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").innerHTML = String(days).padStart(2, "0");
      document.getElementById("hours").innerHTML = String(hours).padStart(
        2,
        "0"
      );
      document.getElementById("minutes").innerHTML = String(minutes).padStart(
        2,
        "0"
      );
      document.getElementById("seconds").innerHTML = String(seconds).padStart(
        2,
        "0"
      );
    }
  }

  //Function to set a new target date
  function setNewDate(newDate) {
    targetDate = new Date(newDate).getTime(); // Update the target date
    localStorage.setItem("targetDate", newDate); // Save the new target date to localStorage
    countdownEnded = false; // Reset the countdown ended flag
    localStorage.setItem("countdownEnded", "false"); // Ensure it is reset in localStorage

    // Reset the title
    document.querySelector(".title-text").innerHTML =
      "URMĂTOAREA GLUMĂ CU BUTOANELE VA FI ÎN:";

    // Reset the countdown numbers display
    updateCountdown();
  }

  // Initial call to update the countdown
  updateCountdown();
  const x = setInterval(updateCountdown, 1000); // Update countdown every second

  // Event listeners for buttons
  // document.getElementById("set-date").addEventListener("click", () => {
  //   const newDate = document.getElementById("new-date").value;
  //   if (newDate) {
  //     setNewDate(newDate);
  //     document.getElementById("message").textContent =
  //       "New date set successfully!";
  //   } else {
  //     document.getElementById("message").textContent = "Please select a date.";
  //   }
  // });

  // Back button functionality
  document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });
});
