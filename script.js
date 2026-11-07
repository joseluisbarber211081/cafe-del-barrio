'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-nav');
function closeMobileMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  mobileMenu.hidden = open;
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 760 && !mobileMenu.hidden) closeMobileMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) { closeMobileMenu(); menuButton.focus(); }
});
const tabs = [...document.querySelectorAll('[data-filter]')];
const items = [...document.querySelectorAll('[data-category]')];
tabs.forEach(tab => tab.addEventListener('click', () => {
  const filter = tab.dataset.filter;
  tabs.forEach(button => {
    const selected = button === tab;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  items.forEach(item => { item.hidden = filter !== 'todos' && item.dataset.category !== filter; });
}));
document.querySelector('#year').textContent = new Date().getFullYear();
// Formulario local: validación únicamente, sin red, almacenamiento ni envío.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const status = document.getElementById('contact-status');
  const fields = ['name', 'email', 'subject', 'message'];
  const errors = {
    name: 'Introduce tu nombre.',
    email: 'Introduce una dirección de correo válida.',
    subject: 'Selecciona el asunto de tu mensaje.',
    message: 'Escribe al menos 10 caracteres en tu mensaje.'
  };
  const validate = (name) => {
    const field = contactForm.elements.namedItem(name);
    const value = field.value.trim();
    let valid = Boolean(value);
    if (name === 'email') valid = valid && field.validity.valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (name === 'message') valid = value.length >= 10;
    field.setAttribute('aria-invalid', String(!valid));
    document.getElementById('error-' + name).textContent = valid ? '' : errors[name];
    return valid;
  };
  fields.forEach((name) => {
    const field = contactForm.elements.namedItem(name);
    field.addEventListener(name === 'subject' ? 'change' : 'input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(name);
      status.textContent = '';
      status.className = '';
    });
  });
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const failures = fields.filter(name => !validate(name));
    if (failures.length) {
      status.className = 'error';
      status.textContent = 'Revisa los campos marcados antes de continuar.';
      contactForm.elements.namedItem(failures[0]).focus();
      return;
    }
    status.className = 'success';
    status.textContent = 'Demostración completada. No se ha enviado ni guardado ningún mensaje.';
    contactForm.reset();
    fields.forEach(name => contactForm.elements.namedItem(name).removeAttribute('aria-invalid'));
    status.focus();
  });
}
