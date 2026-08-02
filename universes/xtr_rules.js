const panel = document.querySelector('.image-panel');
const panelText = document.querySelector('.image-panel-copy__text');
const panelCopy = document.querySelector('.image-panel-copy');
const buttons = Array.from(document.querySelectorAll('.character-button'));
let activeImage = null;
let activeButton = null;
let activeIndex = -1;
let textRevealTimeout = null;

function showCharacter(button) {
  const nextIndex = buttons.indexOf(button);
  const img = button.querySelector('img');
  if (!img || !panel) return;

  if (button === activeButton) return;

  const src = img.getAttribute('src');
  const alt = img.getAttribute('alt') || button.getAttribute('aria-label') || 'Character';
  const movingForward = activeIndex === -1 || nextIndex > activeIndex;
  const nextText = button.dataset.description || alt;

  const nextImage = document.createElement('img');
  nextImage.className = 'character-display';
  nextImage.classList.add(movingForward ? 'from-right' : 'from-left');
  nextImage.src = src;
  nextImage.alt = alt;
  panel.appendChild(nextImage);

  if (panelText && panelCopy) {
    window.clearTimeout(textRevealTimeout);
    panelCopy.classList.remove('is-visible');
    panelText.textContent = nextText;
  }

  if (activeImage) {
    const previousImage = activeImage;
    activeImage.classList.remove('is-active');
    previousImage.classList.add(movingForward ? 'exit-left' : 'exit-right');
    activeImage = nextImage;

    requestAnimationFrame(() => {
      nextImage.classList.add('is-active');
    });

    if (panelCopy) {
      textRevealTimeout = window.setTimeout(() => {
        panelCopy.classList.add('is-visible');
      }, 240);
    }

    window.setTimeout(() => {
      previousImage.remove();
    }, 1000);
  } else {
    activeImage = nextImage;

    requestAnimationFrame(() => {
      nextImage.classList.add('is-active');
    });

    if (panelCopy) {
      textRevealTimeout = window.setTimeout(() => {
        panelCopy.classList.add('is-visible');
      }, 240);
    }
  }

  if (activeButton) {
    activeButton.classList.remove('is-selected');
  }

  button.classList.add('is-selected');
  activeButton = button;
  activeIndex = nextIndex;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => showCharacter(button));
});

if (buttons.length) {
  showCharacter(buttons[0]);
}
