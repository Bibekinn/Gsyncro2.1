// ============================================================
// GSYNCRO — Home Page Specific Logic (script.js)
// Handles hero slideshow, newsletter forms, and homepage featured items
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Render Homepage Featured Products (New Arrivals)
  await renderHomepageFeatured();

  // Initialize Slideshow
  initHeroSlideshow();
});

// Render dynamic homepage featured products
async function renderHomepageFeatured() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Fetch products from central database
  const products = await GSYNCRO_API.fetchProducts();
  
  // Featured: first in-stock items excluding exclusive ethnic collection
  const featured = products.filter(p => p.category !== 'ethnic').slice(0, 4);

  grid.innerHTML = featured.map(p => {
    const labels = { 'street-style': 'Street Style', 'office-wear': 'Office Wear', 'casual': 'Casual', 'night-luxe': 'Night Luxe' };
    const categoryLabel = labels[p.category] || (p.category ? p.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Collection');
    return `
      <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'">
        <div class="product-img">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <button class="product-wish" onclick="toggleWish(event, this)" aria-label="Wishlist">♡</button>
        </div>
        <div class="product-info">
          <p class="product-brand">${categoryLabel}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">
            ${p.oldPrice ? `<s>$${p.oldPrice}</s>` : ''} 
            $${p.price}
          </p>
          <button class="add-cart" onclick="quickAddFromHome(event, ${p.id}, '${p.sizes[0]}')">Add to Bag</button>
        </div>
      </div>
    `;
  }).join('');
}

// Global functions for inline homepage handlers
window.toggleWish = function(e, btn) {
  e.stopPropagation();
  if (btn.textContent === '♡') {
    btn.textContent = '♥';
    btn.style.color = 'var(--rose)';
    showToast('Added to wishlist');
  } else {
    btn.textContent = '♡';
    btn.style.color = '';
    showToast('Removed from wishlist');
  }
};

window.quickAddFromHome = function(e, id, defaultSize) {
  e.stopPropagation();
  Cart.add(id, defaultSize, 1);
  showToast('Item added to your bag');
  openCart();
};

// Hero Slideshow Logic
function initHeroSlideshow() {
  const slideshow = document.getElementById('heroSlider');
  if (!slideshow) return;

  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const labels = ['Street Style', 'Office Wear', 'Night Luxe', 'Casual'];
  const slideNumEl = document.getElementById('slideNum');
  const slideLabelEl = document.getElementById('slideLabel');
  const progressEl = document.getElementById('slideProgress');

  if (slides.length === 0) return;

  let current = 0;
  let timer = null;
  let paused = false;

  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    
    if (slideNumEl) slideNumEl.textContent = String(current + 1).padStart(2, '0');
    if (slideLabelEl) slideLabelEl.textContent = labels[current];
    resetProgress();
  }

  function resetProgress() {
    if (!progressEl) return;
    progressEl.classList.remove('animating');
    progressEl.style.width = '0%';
    void progressEl.offsetWidth; // Trigger reflow
    progressEl.classList.add('animating');
    progressEl.style.width = '100%';
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!paused) goTo(current + 1);
    }, 5000);
  }

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
      startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo(current - 1);
      startAuto();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.i, 10));
      startAuto();
    });
  });

  slideshow.addEventListener('mouseenter', () => paused = true);
  slideshow.addEventListener('mouseleave', () => paused = false);

  // Touch Swipe Integration
  let touchStartX = 0;
  slideshow.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slideshow.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      goTo(dx < 0 ? current + 1 : current - 1);
      startAuto();
    }
  });

  resetProgress();
  startAuto();
}

// Newsletter Subscription
function handleSubscribe(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  if (!btn) return;
  
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#c9a96e';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}
// Expose newsletter function to window
window.handleSubscribe = handleSubscribe;
