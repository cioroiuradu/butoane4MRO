const targetDate = new Date("2024-11-10T13:05:00").getTime(); // Set your target date here

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Calculate days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the respective HTML elements
  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerHTML =
    seconds < 10 ? "0" + seconds : seconds;

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Countdown Ended";
  }
}

// Update the countdown every 1 second
setInterval(updateCountdown, 1000);
