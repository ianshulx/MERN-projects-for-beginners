document.addEventListener('DOMContentLoaded', () => {
  const menuLabel = document.getElementById('menu-label');
  const menuButtons = document.getElementById('menu-buttons');

  // Initially hide the buttons
  menuButtons.classList.add('hidden');
  menuLabel.setAttribute('aria-expanded', 'false');

  menuLabel.addEventListener('click', () => {
    const isExpanded = menuLabel.getAttribute('aria-expanded') === 'true';
    menuLabel.setAttribute('aria-expanded', !isExpanded);
    menuButtons.classList.toggle('hidden');
  });

  // Optional: Allow toggle with keyboard (Enter or Space)
  menuLabel.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      menuLabel.click();
    }
  });
});
