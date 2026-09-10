(() => {
  'use strict';

  const WHATSAPP_URL = 'https://wa.me/5511999999999?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20LUM%C3%89A%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20facial.';

  // Centraliza o link de conversão para facilitar a troca do número depois.
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = WHATSAPP_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileCta = document.querySelector('[data-mobile-cta]');
  const hero = document.querySelector('[data-hero]');

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  let headerTicking = false;
  updateHeader();
  window.addEventListener('scroll', () => {
    if (headerTicking) return;
    headerTicking = true;
    requestAnimationFrame(() => {
      updateHeader();
      headerTicking = false;
    });
  }, { passive: true });

  if (menuToggle && mobileMenu) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      mobileMenu.classList.toggle('is-open', !isOpen);
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
      document.body.classList.toggle('menu-open', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Entrada suave dos elementos conforme entram no viewport.
  const revealElements = document.querySelectorAll('.reveal, .reveal-image');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12
    });

    revealElements.forEach((element, index) => {
      if (!element.style.getPropertyValue('--delay') && index % 4 !== 0) {
        element.style.setProperty('--delay', `${(index % 4) * 0.045}s`);
      }
      revealObserver.observe(element);
    });
  }


  // Mantém a animação contínua do marquee pausada fora da viewport.
  const marquee = document.querySelector('.marquee-line');
  if (marquee) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      marquee.classList.add('is-active');
    } else {
      const marqueeObserver = new IntersectionObserver(([entry]) => {
        marquee.classList.toggle('is-active', entry.isIntersecting);
      }, { rootMargin: '120px 0px' });
      marqueeObserver.observe(marquee);
    }
  }

  // CTA inferior no mobile aparece somente depois de o hero ficar para trás.
  if (mobileCta && hero && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      mobileCta.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    }, { threshold: 0.08 });

    heroObserver.observe(hero);
  }

  // Slider manual de depoimentos, sem autoplay agressivo.
  const testimonials = [...document.querySelectorAll('[data-testimonial]')];
  const prevButton = document.querySelector('[data-testimonial-prev]');
  const nextButton = document.querySelector('[data-testimonial-next]');
  const indexLabel = document.querySelector('[data-testimonial-index]');
  let testimonialIndex = 0;

  const showTestimonial = (index) => {
    if (!testimonials.length) return;
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, itemIndex) => {
      item.classList.toggle('is-active', itemIndex === testimonialIndex);
      item.setAttribute('aria-hidden', String(itemIndex !== testimonialIndex));
    });

    if (indexLabel) {
      indexLabel.textContent = String(testimonialIndex + 1).padStart(2, '0');
    }
  };

  prevButton?.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
  nextButton?.addEventListener('click', () => showTestimonial(testimonialIndex + 1));
  showTestimonial(0);

  // Fecha o menu apenas quando o breakpoint realmente muda para desktop.
  const desktopMedia = window.matchMedia('(min-width: 941px)');
  const handleDesktopChange = (event) => {
    if (!event.matches || !document.body.classList.contains('menu-open')) return;
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };
  desktopMedia.addEventListener?.('change', handleDesktopChange);
})();
