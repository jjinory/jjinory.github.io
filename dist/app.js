const projectNav = document.querySelector('.project-nav');
const toggle = document.querySelector('.project-nav-toggle');
const menu = document.querySelector('#project-menu');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
}
toggle.addEventListener('click', () => setMenu(menu.hidden));
projectNav.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') setMenu(true);
});
projectNav.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' && !projectNav.contains(document.activeElement)) setMenu(false);
});
projectNav.addEventListener('focusout', event => {
  if (!projectNav.contains(event.relatedTarget)) setMenu(false);
});
document.addEventListener('click', event => {
  if (!projectNav.contains(event.target)) setMenu(false);
});
projectNav.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setMenu(false);
    toggle.focus();
  } else if (event.key === 'ArrowDown' && event.target === toggle) {
    event.preventDefault();
    setMenu(true);
    menu.querySelector('a').focus();
  }
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
const navLinks = [...document.querySelectorAll('header [data-section]')];
if (document.body.classList.contains('project-page')) {
  toggle.classList.add('active');
  menu.querySelector('a[href="./counthub.html"]').setAttribute('aria-current', 'page');
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.dataset.section === entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
