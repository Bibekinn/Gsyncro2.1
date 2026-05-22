
// ============================================================
// GSYNCRO — Shared Core JavaScript (common.js)
// Handles navbar scroll, mobile menu, cart drawer, and toast notifications
// ============================================================

// Toggle Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
  }
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const isHome = window.location.pathname.endsWith('index.html') || 
                 window.location.pathname === '/' || 
                 window.location.pathname.endsWith('/');
                 
  if (isHome) {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  } else {
    navbar.classList.add('scrolled'); // Force solid state on subpages
  }
}

window.addEventListener('scroll', handleNavbarScroll);
document.addEventListener('DOMContentLoaded', handleNavbarScroll);

// Toast Notification
function showToast(message = 'Item added to your bag') {
  const toast = document.getElementById('cartToast');
  const toastText = document.getElementById('toastText');
  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Cart Drawer Functionality
function openCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar && overlay) {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    renderCart();
  }
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar && overlay) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// Bind Cart UI Elements
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cartBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  // Initial render of cart drawer
  renderCart();
});

// Sync UI when cart changes
window.addEventListener('cartUpdated', () => {
  renderCart();
});

// Render Cart Drawer
function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');

  if (!cartItemsEl) return;

  const cartItems = Cart.get();
  const subtotal = Cart.total();
  const count = Cart.count();

  // Update header bag count if element exists
  const bagCountEl = document.getElementById('bagCount');
  if (bagCountEl) {
    bagCountEl.textContent = count;
  }

  // Update bag count in header action button
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }

  if (cartItems.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <p>Your bag is empty.</p>
        <p style="font-size: 0.8rem; color: var(--muted); margin-top: 8px;">Start exploring the collection.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (shippingEl) shippingEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  // Render items
  cartItemsEl.innerHTML = cartItems.map(item => {
    // Find category display label
    const categoryLabel = item.category ? item.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Collection';
    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${categoryLabel} — Size: ${item.size}</p>
          <div class="cart-qty">
            <button onclick="handleCartChangeQty('${item.key}', -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="handleCartChangeQty('${item.key}', 1)">+</button>
          </div>
        </div>
        <div class="cart-item-price-wrapper">
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
          <button class="cart-item-remove" onclick="handleCartRemove('${item.key}')" aria-label="Remove item">✕</button>
        </div>
      </div>
    `;
  }).join('');

  // Calculate Shipping (Free above $50, else flat $9.99)
  const shippingCost = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shippingCost;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) {
    shippingEl.textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
  }
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Global functions for cart onclick handlers
window.handleCartChangeQty = function(key, delta) {
  Cart.changeQty(key, delta);
};

window.handleCartRemove = function(key) {
  Cart.remove(key);
};

// Checkout redirection / handler
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    const cartItems = Cart.get();
    if (cartItems.length === 0) {
      alert('Your bag is empty!');
      return;
    }
    
    // Future backend integration spot
    alert(`Thank you for shopping at GSYNCRO!\nCheckout amount: $${(Cart.total() + (Cart.total() >= 50 ? 0 : 9.99)).toFixed(2)}\n\nPayment gateway integration coming soon.`);
  });
}

const viewBagBtn = document.querySelector('.view-bag-btn');
if (viewBagBtn) {
  viewBagBtn.addEventListener('click', () => {
    // Redirect to the shop/all products page to see more items
    window.location.href = 'shop.html';
  });
}
