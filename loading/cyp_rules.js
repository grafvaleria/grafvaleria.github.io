const divs = document.querySelectorAll('.desc');
const fadeDuration = 1000;      // 600ms fade-in/out
const holdDuration = 6800;     // ~6.8s visible
const totalDivs = divs.length;
let current = 0;

function showNext() {
  const div = divs[current];

  // Make div visible before fade-in
  div.style.visibility = 'visible';
  div.style.opacity = 1;  // fade-in

  // Schedule fade-out after holdDuration
  setTimeout(() => {
    div.style.opacity = 0; // fade-out

    // Hide completely after fadeDuration
    setTimeout(() => {
      div.style.visibility = 'hidden';
    }, fadeDuration);

  }, holdDuration);

  // Move to next div after full cycle
  current = (current + 1) % totalDivs;
  setTimeout(showNext, holdDuration + fadeDuration);
}

// Initialize all divs
divs.forEach(d => {
  d.style.opacity = 0;
  d.style.visibility = 'hidden';
});

// Start the loop after optional delay
setTimeout(showNext, 600);