const galleryImage = document.querySelector('#galleryImage');
const thumbs = document.querySelectorAll('.thumb');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');

// COLE ENTRE AS ASPAS O LINK DO SEU CHECKOUT QUANDO ELE ESTIVER PRONTO.
const CHECKOUT_URL = '';
document.querySelectorAll('[data-buy]').forEach((link) => {
  if (CHECKOUT_URL) {
    link.href = CHECKOUT_URL;
  }
});

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    thumbs.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    galleryImage.src = thumb.dataset.image;
    galleryImage.alt = thumb.dataset.alt;
  });
});

function openLightbox(src, alt, rotated = false) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxImage.classList.toggle('rotated-lightbox', rotated);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  document.querySelector('.lightbox-close').focus();
}

document.querySelector('.gallery-main').addEventListener('click', () => {
  openLightbox(galleryImage.src, galleryImage.alt);
});

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    openLightbox(button.dataset.lightbox, button.dataset.alt, button.dataset.rotate === 'true');
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

function formatRelativeDate(dateString) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const date = new Date(`${dateString}T12:00:00`);
  const days = Math.max(0, Math.floor((today - date) / 86400000));
  if (days === 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  if (days < 30) return `Há ${days} dias`;
  if (days < 365) {
    const months = Math.max(1, Math.round(days / 30));
    return `Há ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }
  const years = Math.max(1, Math.round(days / 365));
  return `Há ${years} ${years === 1 ? 'ano' : 'anos'}`;
}

document.querySelectorAll('.review-date').forEach((item) => {
  item.textContent = formatRelativeDate(item.dateTime);
});

document.querySelector('#year').textContent = new Date().getFullYear();
