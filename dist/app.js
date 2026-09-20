const dialog = document.querySelector('#project-dialog');
const projectButton = document.querySelector('#open-project');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let opening = false;
let closeTimer;

projectButton.addEventListener('click', async () => {
  if (opening || dialog.open) return;
  opening = true;
  try {
    if (!reducedMotion.matches) {
      const press = projectButton.animate([
        { transform: getComputedStyle(projectButton).transform },
        { transform: 'translateY(0) scale(0.985)' }
      ], { duration: 90, easing: 'ease-out' });
      await press.finished.catch(() => {});
    }
    dialog.classList.remove('is-closing');
    dialog.showModal();
    dialog.scrollTop = 0;
  } finally {
    opening = false;
  }
});

function finishClose() {
  clearTimeout(closeTimer);
  if (dialog.open) dialog.close();
  dialog.classList.remove('is-closing');
}
function closeProject() {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  if (reducedMotion.matches) return finishClose();
  dialog.classList.add('is-closing');
  // Also finish if animation events are interrupted by browser or motion settings.
  closeTimer = setTimeout(finishClose, 220);
}
document.querySelector('#close-dialog').addEventListener('click', closeProject);
dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeProject();
});
dialog.addEventListener('animationend', event => {
  if (event.target === dialog && event.animationName === 'overview-out') finishClose();
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
});
dialog.addEventListener('close', () => {
  clearTimeout(closeTimer);
  dialog.classList.remove('is-closing');
  projectButton.focus({ preventScroll: true });
});
const navLinks = [...document.querySelectorAll('header nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const active = link.hash === '#' + entry.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
