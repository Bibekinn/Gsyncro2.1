// ============================================================
// GSYNCRO — Ethnic Collection Landing Page
// Loads ethnic products from central store; mirrors shop card behavior
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
  const allProducts = await GSYNCRO_API.fetchProducts();
  const ethnicProducts = allProducts.filter(p => p.category === 'ethnic');
  renderEthnicProducts(ethnicProducts);
});

function renderEthnicProducts(products) {
  const grid = document.getElementById('ethnicProductsGrid');
  const countEl = document.getElementById('ethnicCount');
  if (!grid) return;

  if (countEl) {
    countEl.textContent = `Showing ${products.length} curated piece${products.length === 1 ? '' : 's'}`;
  }

  if (products.length === 0) {
    grid.innerHTML = '<p class="ec-products-count">No ethnic pieces available at the moment.</p>';
    return;
  }

  grid.innerHTML = products.map(p => buildProductCardHTML(p)).join('');
}

function buildProductCardHTML(p) {
  const categoryLabel = 'Ethnic';
  const outOfStockLabel = !p.inStock ? '<span class="stock-badge-out">Out of Stock</span>' : '';
  const sizeOptions = p.sizes.join(', ');

  let badgeClass = '';
  if (p.badge) {
    const badgeLower = p.badge.toLowerCase();
    if (badgeLower === 'new') badgeClass = 'new-badge';
    else if (badgeLower === 'bestseller') badgeClass = 'bestseller-badge';
    else if (badgeLower.includes('limited')) badgeClass = 'limited-badge';
    else if (badgeLower.includes('sale')) badgeClass = 'sale-badge';
  }
  const badgeHTML = p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : '';

  return `
    <div class="product-card" onclick="navigateToEthnicDetail(event, ${p.id})">
      <div class="product-img">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        ${badgeHTML}
        ${outOfStockLabel}
        <button class="product-wish" onclick="toggleEthnicWish(event, this)" aria-label="Wishlist">♡</button>
      </div>
      <div class="product-info">
        <p class="product-brand">${categoryLabel}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-sizes">Sizes: ${sizeOptions}</p>
        <p class="product-price">
          ${p.oldPrice ? `<s>$${p.oldPrice}</s>` : ''}
          $${p.price}
        </p>
        ${p.inStock
          ? `<button class="add-cart" onclick="quickAddEthnic(event, ${p.id}, '${p.sizes[0]}')">Add to Bag</button>`
          : `<button class="add-cart out-of-stock" disabled>Out of Stock</button>`
        }
      </div>
    </div>
  `;
}

window.navigateToEthnicDetail = function (e, id) {
  if (e.target.closest('.add-cart') || e.target.closest('.product-wish')) {
    return;
  }
  window.location.href = `product-detail.html?id=${id}`;
};

window.toggleEthnicWish = function (e, btn) {
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

window.quickAddEthnic = function (e, id, defaultSize) {
  e.stopPropagation();
  Cart.add(id, defaultSize, 1);
  showToast('Item added to your bag');
  openCart();
};
