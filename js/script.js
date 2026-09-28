const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

const updateTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (themeIcon) {
    themeIcon.classList.toggle('fa-moon', theme === 'dark');
    themeIcon.classList.toggle('fa-sun', theme === 'light');
  }
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  updateTheme('light');
} else {
  updateTheme('dark');
}

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

themeToggle?.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  updateTheme(currentTheme);
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.hidden = false;
    formStatus.classList.remove('error');
    formStatus.textContent = 'Sending your message...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/olivierniyitanga13@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message')
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Message could not be sent');
      }

      formStatus.textContent = 'Your message has been sent successfully!';
      contactForm.reset();
    } catch (error) {
      formStatus.classList.add('error');
      formStatus.textContent = 'Something went wrong while sending the message. Please try again.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send message';
    }
  });
}

const typingText = document.querySelector('.typing-text');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  typingText.textContent = 'Backend Developer';
} else {
  new Typed('.typing-text', {
    strings: [
      'Backend Developer',
      'Software Engineering Trainer',
      'Java & Spring Boot Developer',
      'REST API Developer'
    ],
    typeSpeed: 80,
    backSpeed: 35,
    loop: true,
    smartBackspace: true
  });
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((element) => observer.observe(element));

const portrait = document.querySelector('.profile-card');

if (portrait && !prefersReducedMotion) {
  const resetPortraitTilt = () => {
    portrait.style.rotate = 'y 0deg';
  };

  portrait.addEventListener('pointermove', (event) => {
    const bounds = portrait.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;

    portrait.style.rotate = `y ${horizontalPosition * 18}deg`;
  });

  portrait.addEventListener('pointerleave', resetPortraitTilt);
  portrait.addEventListener('pointercancel', resetPortraitTilt);
}
