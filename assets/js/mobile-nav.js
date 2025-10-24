// Mobile Navigation - Hamburger Menu Toggle
// Add this script to any page that uses the mobile navigation

function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (!menu) return;

  menu.classList.toggle('open');

  // Change icon between hamburger and X
  const button = document.querySelector('.menu-toggle');
  if (button) {
    button.textContent = menu.classList.contains('open') ? '✕' : '☰';
  }
}

// Close menu when clicking a link (better UX)
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('#nav-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('nav-menu');
      if (menu && menu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
});
