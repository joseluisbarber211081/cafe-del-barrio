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
// Validación en cliente y envío real mediante FormSubmit AJAX.
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
  let sending = false;
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formEndpoint = 'https://formsubmit.co/ajax/joseluisbarber211081@gmail.com';
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    const failures = fields.filter(name => !validate(name));
    if (failures.length) {
      status.className = 'error';
      status.textContent = 'Revisa los campos marcados antes de continuar.';
      contactForm.elements.namedItem(failures[0]).focus();
      return;
    }
    if (contactForm.elements.namedItem('_honey').value) return;
    const values = Object.fromEntries(fields.map(name => [name, contactForm.elements.namedItem(name).value.trim()]));
    const labels = { consulta: 'Consulta general', carta: 'Carta y productos', otro: 'Otro asunto' };
    const subject = labels[values.subject] || values.subject;
    sending = true;
    submitButton.disabled = true;
    status.className = '';
    status.textContent = 'Enviando tu mensaje…';
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          nombre: values.name,
          email: values.email,
          asunto: subject,
          mensaje: values.message,
          _subject: 'Café del Barrio · ' + subject + ' · ' + values.name,
          _replyto: values.email,
          _template: 'table',
          _captcha: 'false',
          _honey: ''
        })
      });
      const data = await response.json().catch(() => null);
      const responseText = String(data && data.message || '').toLowerCase();
      if (responseText.includes('activat') || responseText.includes('activar')) {
        status.className = 'error';
        status.textContent = 'El formulario está pendiente de activación: revisa el correo de confirmación de FormSubmit. Tu mensaje sigue escrito para que puedas intentarlo más tarde.';
      } else if (response.ok && data && (data.success === true || data.success === 'true')) {
        status.className = 'success';
        status.textContent = 'Mensaje aceptado por FormSubmit. Gracias por escribirnos.';
        contactForm.reset();
        fields.forEach(name => contactForm.elements.namedItem(name).removeAttribute('aria-invalid'));
      } else {
        status.className = 'error';
        status.textContent = 'El servicio no ha podido procesar el mensaje. Vuelve a intentarlo; tus datos siguen en el formulario.';
      }
    } catch {
      status.className = 'error';
      status.textContent = 'No se pudo conectar con el servicio de envío. Comprueba tu conexión; tus datos siguen en el formulario.';
    } finally {
      sending = false;
      submitButton.disabled = false;
      status.focus();
    }
  });
}
