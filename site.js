(() => {
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.hero-slide')];
    const pause = carousel.querySelector('.carousel-pause');
    const counter = carousel.querySelector('.slide-counter');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0, playing = !reduced.matches, timer;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === current);
        slide.setAttribute('aria-hidden', String(i !== current));
        slide.querySelector('a').tabIndex = i === current ? 0 : -1;
      });
      counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    function schedule() {
      clearInterval(timer);
      pause.textContent = playing ? 'Pause' : 'Play';
      pause.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
      if (playing && !document.hidden) timer = setInterval(() => show(current + 1), 6500);
    }
    carousel.querySelectorAll('[data-direction]').forEach(button => {
      button.addEventListener('click', () => {
        playing = false; show(current + Number(button.dataset.direction)); schedule();
      });
    });
    pause.addEventListener('click', () => { playing = !playing; schedule(); });
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', schedule);
    carousel.addEventListener('focusin', () => clearInterval(timer));
    carousel.addEventListener('focusout', e => { if (!carousel.contains(e.relatedTarget)) schedule(); });
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', () => { if (reduced.matches) { playing = false; schedule(); } });
    show(0);
    schedule();
  }
  const links = document.querySelectorAll('[data-lightbox]');
  if (links.length && typeof HTMLDialogElement !== 'undefined') {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-dialog';
    dialog.setAttribute('aria-label', 'Enlarged project image');
    const close = document.createElement('button'); close.type = 'button'; close.textContent = 'Close ×';
    const img = document.createElement('img');
    dialog.append(close, img); document.body.append(dialog);
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; img.removeAttribute('src'); });
    links.forEach(link => link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); img.src = link.href; img.alt = link.querySelector('img').alt;
      dialog.showModal(); document.body.style.overflow = 'hidden';
    }));
  }
})();
