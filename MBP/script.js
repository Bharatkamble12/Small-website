 // 🌸 Happy Birthday Mom — Click Only Flow by Bharat

// Select elements
const startButton = document.getElementById("startButton");
const giftBoxSection = document.getElementById("giftBoxSection");
const giftBox = document.getElementById("giftBox");
const cakeSection = document.getElementById("cakeSection");
const cutCakeBtn = document.getElementById("cutCakeBtn");
const carouselSection = document.getElementById("carouselSection");
const goToLetter = document.getElementById("goToLetter");
const letterSection = document.getElementById("letterSection");
const readLetterBtn = document.getElementById("readLetterBtn");
const letterContent = document.getElementById("letterContent");
const countdownSection = document.getElementById("countdownSection");
const countdown = document.getElementById("countdown");
const celebrationText = document.getElementById("celebrationText");
const giftButton = document.getElementById("giftButton");
const saiBabaSection = document.getElementById("saiBabaSection");
const thankYouSection = document.getElementById("thankYouSection");

// Hide all initially
function hideAll() {
  giftBoxSection.style.display = "none";
  cakeSection.style.display = "none";
  carouselSection.style.display = "none";
  letterSection.style.display = "none";
  countdownSection.style.display = "none";
  saiBabaSection.style.display = "none";
  thankYouSection.style.display = "none";
}
hideAll();

// Step 1 → Gift Box
startButton.addEventListener("click", () => {
  document.getElementById("heroSection").style.display = "none";
  giftBoxSection.style.display = "flex";
});

// Step 2 → Gift Box Click
giftBox.addEventListener("click", () => {
  giftBoxSection.style.display = "none";

  if (window.innerWidth <= 480) {
    // Mobile flow: show cake first
    cakeSection.style.display = "flex";

    // After 2 seconds, hide cake and show letter section with button
    setTimeout(() => {
      cakeSection.style.display = "none";
      letterSection.style.display = "flex";

      // Show the button and hide content initially
      readLetterBtn.style.display = "block";
      letterContent.style.display = "none";
    }, 2000);
  } else {
    // Desktop flow: go to carousel
    carouselSection.style.display = "flex";
  }
});

// Mobile: Letter Button Click
if (window.innerWidth <= 480) {
  readLetterBtn.addEventListener("click", () => {
    // Hide button and show content
    readLetterBtn.style.display = "none";
    letterContent.style.display = "block";

    // After 4 seconds, move to countdown automatically
    setTimeout(() => {
      letterSection.style.display = "none";
      countdownSection.style.display = "flex";
      startCountdown();
    }, 4000);
  });
}

// Desktop: Carousel → Letter
goToLetter.addEventListener("click", () => {
  // Only desktop reaches this flow
  carouselSection.style.display = "none";
  letterSection.style.display = "flex";

  // Hide button immediately on desktop
  readLetterBtn.style.display = "none";
  letterContent.style.display = "block";

  setTimeout(() => {
    letterSection.style.display = "none";
    countdownSection.style.display = "flex";
    startCountdown();
  }, 4000);
});

// Step 6 → Countdown + Confetti
function startCountdown() {
  let count = 3;
  countdown.textContent = count;
  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdown.textContent = count;
    } else {
      clearInterval(timer);
      countdown.style.display = "none";
      triggerCelebration();
    }
  }, 1000);
}

function triggerCelebration() {
  celebrationText.style.display = "block";

  // Confetti emojis
  const confettiEmojis = ["🎉", "🌸", "🌺"];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
    confetti.style.position = "absolute";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-20px";
    confetti.style.fontSize = 24 + Math.random() * 20 + "px";
    confetti.style.animation = `fall ${3 + Math.random() * 3}s linear forwards`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
  }

  // 🌸 Automatically show Birthday Gift (Sai Baba section) after 2 seconds
  setTimeout(() => {
    countdownSection.style.display = "none";   // hide celebration section
    saiBabaSection.style.display = "flex";     // show Sai Baba section

    // Automatically move to Thank You section after 5 seconds
    setTimeout(() => {
      saiBabaSection.style.display = "none";
      thankYouSection.style.display = "flex";
    }, 5000);
  }, 2000);
}

// Step 7 → Sai Baba & Thank You
giftButton.addEventListener("click", () => {
  countdownSection.style.display = "none";
  saiBabaSection.style.display = "flex";

  setTimeout(() => {
    saiBabaSection.style.display = "none";
    thankYouSection.style.display = "flex";
  }, 4000);
});

// Confetti fall animation
const style = document.createElement("style");
style.textContent = `
@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}`;
document.head.appendChild(style);
