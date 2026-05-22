// ============================================================
// GSYNCRO — Product Details Logic (product-detail.js)
// Handles gallery switching, image zoom, size validation, related items
// ============================================================

let currentProduct = null;
let selectedSize = null;
let currentQty = 1;

const CATEGORY_LABELS = {
  'street-style': 'Street Style',
  'office-wear': 'Office Wear',
  'casual': 'Casual',
  'night-luxe': 'Night Luxe',
  'ethnic': 'Ethnic Collection',
  'accessories': 'Accessories'
};

function getCategoryLabel(category) {
  if (!category) return 'Collection';
  return CATEGORY_LABELS[category] || category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

document.addEventListener('DOMContentLoaded', async () => {
  // Parse URL ID
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    handleInvalidProduct();
    return;
  }

  // Fetch product from GSYNCRO API
  currentProduct = await GSYNCRO_API.fetchProductById(productId);

  if (!currentProduct) {
    handleInvalidProduct();
    return;
  }

  // Render Product Details
  renderProductDetails();

  // Setup Zoom Effect
  setupImageZoom();

  // Fetch & Render Related Products
  renderRelatedProducts();
});

// Error handling fallback
function handleInvalidProduct() {
  alert('Product not found! Redirecting to shop.');
  window.location.href = 'shop.html';
}

// Render dynamic fields
function renderProductDetails() {
  if (!currentProduct) return;

  // Breadcrumbs
  const crumbCat = document.getElementById('breadcrumbCategoryLink');
  const crumbName = document.getElementById('breadcrumbProductName');
  
  if (crumbCat) {
    const catLabel = getCategoryLabel(currentProduct.category);
    crumbCat.textContent = catLabel;
    if (currentProduct.category === 'accessories') {
      crumbCat.href = 'accessories.html';
    } else {
      crumbCat.href = `shop.html?category=${currentProduct.category}`;
    }
  }
  if (crumbName) {
    crumbName.textContent = currentProduct.name;
  }

  // Main UI texts
  const detailTitle = document.getElementById('productDetailTitle');
  const detailCat = document.getElementById('productDetailCategory');
  const detailDesc = document.getElementById('productDetailDescription');
  const mainImg = document.getElementById('mainProductImg');

  if (detailTitle) detailTitle.textContent = currentProduct.name;
  if (detailCat) {
    detailCat.textContent = getCategoryLabel(currentProduct.category);
  }
  if (detailDesc) detailDesc.textContent = currentProduct.description;
  if (mainImg) {
    mainImg.src = currentProduct.images[0];
    mainImg.alt = currentProduct.name;
  }

  // Badges
  const badgeEl = document.getElementById('productDetailBadge');
  if (badgeEl) {
    if (currentProduct.badge) {
      badgeEl.textContent = currentProduct.badge;
      badgeEl.style.display = 'block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // Price block
  const oldPriceEl = document.getElementById('productDetailOldPrice');
  const priceEl = document.getElementById('productDetailPrice');

  if (priceEl) priceEl.textContent = `$${currentProduct.price.toFixed(2)}`;
  if (oldPriceEl) {
    if (currentProduct.oldPrice) {
      oldPriceEl.textContent = `$${currentProduct.oldPrice.toFixed(2)}`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }

  // Out of Stock CTA check
  const addBtn = document.getElementById('addToBagBtn');
  if (addBtn) {
    if (!currentProduct.inStock) {
      addBtn.textContent = 'Out of Stock';
      addBtn.classList.add('disabled-btn');
      addBtn.disabled = true;
    }
  }

  // Size chips
  const sizeWrapper = document.getElementById('detailSizesWrapper');
  if (sizeWrapper) {
    sizeWrapper.innerHTML = currentProduct.sizes.map(size => {
      return `<button class="size-chip-btn" onclick="selectSize(this, '${size}')">${size}</button>`;
    }).join('');
  }

  // Thumbnail strip
  const thumbStrip = document.getElementById('thumbnailStrip');
  if (thumbStrip && currentProduct.images.length > 1) {
    thumbStrip.innerHTML = currentProduct.images.map((imgUrl, idx) => {
      return `
        <div class="thumb-wrapper ${idx === 0 ? 'active' : ''}" onclick="swapActiveImage(this, '${imgUrl}')">
          <img src="${imgUrl}" alt="thumbnail">
        </div>
      `;
    }).join('');
  } else if (thumbStrip) {
    thumbStrip.style.display = 'none'; // hide if only 1 image
  }
}

// Swapping thumbnail logic
window.swapActiveImage = function(wrapper, url) {
  const mainImg = document.getElementById('mainProductImg');
  if (mainImg) {
    mainImg.src = url;
  }

  // Toggle active class on thumbnails
  const thumbs = document.querySelectorAll('.thumb-wrapper');
  thumbs.forEach(t => t.classList.remove('active'));
  wrapper.classList.add('active');

  // Re-initialize zoom background image
  const zoomResult = document.getElementById('zoomResult');
  if (zoomResult) {
    zoomResult.style.backgroundImage = `url('${url}')`;
  }
};

// Size selector toggle
window.selectSize = function(btn, size) {
  const buttons = document.querySelectorAll('.size-chip-btn');
  buttons.forEach(b => b.classList.remove('active'));
  
  btn.classList.add('active');
  selectedSize = size;

  // Clear validation errors
  const valError = document.getElementById('sizeValidationError');
  if (valError) {
    valError.classList.remove('show');
  }
};

// Quantity counter
window.changeDetailQty = function(delta) {
  const qtyEl = document.getElementById('detailQtyVal');
  if (!qtyEl) return;

  currentQty += delta;
  if (currentQty < 1) currentQty = 1;
  qtyEl.textContent = currentQty;
};

// Accordions Toggling
window.toggleAccordion = function(header) {
  const item = header.closest('.accordion-item');
  const content = item.querySelector('.accordion-content');
  const icon = header.querySelector('.accordion-icon');

  const isOpen = item.classList.contains('open');

  // Close all other accordions first
  const allItems = document.querySelectorAll('.accordion-item');
  allItems.forEach(i => {
    i.classList.remove('open');
    const c = i.querySelector('.accordion-content');
    const ic = i.querySelector('.accordion-icon');
    if (c) c.style.maxHeight = null;
    if (ic) ic.textContent = '+';
  });

  if (!isOpen) {
    item.classList.add('open');
    if (content) content.style.maxHeight = content.scrollHeight + 'px';
    if (icon) icon.textContent = '−';
  }
};

// Size Guide modal
window.toggleSizeGuideModal = function(show) {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.style.display = show ? 'flex' : 'none';
  }
};

// Zoom hover implementation
function setupImageZoom() {
  const container = document.getElementById('zoomContainer');
  const img = document.getElementById('mainProductImg');
  const lens = document.getElementById('zoomLens');
  const result = document.getElementById('zoomResult');

  if (!container || !img || !lens || !result) return;

  // Set result background image
  result.style.backgroundImage = `url('${img.src}')`;

  container.addEventListener('mousemove', moveLens);
  container.addEventListener('mouseenter', () => {
    lens.style.display = 'block';
    result.style.display = 'block';
    result.style.backgroundImage = `url('${img.src}')`; // update to active img
  });
  container.addEventListener('mouseleave', () => {
    lens.style.display = 'none';
    result.style.display = 'none';
  });

  function moveLens(e) {
    const rect = img.getBoundingClientRect();
    
    // Lens dimensions
    const lensWidth = lens.offsetWidth;
    const lensHeight = lens.offsetHeight;

    // Mouse coordinates relative to image
    let x = e.clientX - rect.left - (lensWidth / 2);
    let y = e.clientY - rect.top - (lensHeight / 2);

    // Stop lens from leaving image border limits
    if (x > img.width - lensWidth) x = img.width - lensWidth;
    if (x < 0) x = 0;
    if (y > img.height - lensHeight) y = img.height - lensHeight;
    if (y < 0) y = 0;

    // Apply lens position
    lens.style.left = x + 'px';
    lens.style.top = y + 'px';

    // Scale calculation (lens / zoomResult size ratio)
    const cx = result.offsetWidth / lensWidth;
    const cy = result.offsetHeight / lensHeight;

    // Move background zoomed image
    result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
  }
}

// Add to Bag CTA
window.addToBagFromDetail = function() {
  if (!currentProduct) return;

  if (!selectedSize) {
    const valError = document.getElementById('sizeValidationError');
    if (valError) {
      valError.classList.add('show');
    }
    return;
  }

  // Add to Bag store.js operation
  Cart.add(currentProduct.id, selectedSize, currentQty);
  
  // Show toast & open bag
  showToast(`${currentQty} x ${currentProduct.name} (${selectedSize}) added to bag`);
  openCart();
};

// Related items render
async function renderRelatedProducts() {
  const grid = document.getElementById('relatedGrid');
  if (!grid || !currentProduct) return;

  const related = await GSYNCRO_API.fetchRelatedProducts(currentProduct.category, currentProduct.id);

  if (related.length === 0) {
    grid.closest('.related-section').style.display = 'none';
    return;
  }

  grid.innerHTML = related.map(p => {
    const categoryLabel = p.category ? p.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Collection';
    return `
      <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'">
        <div class="product-img">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <p class="product-brand">${categoryLabel}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">
            ${p.oldPrice ? `<s>$${p.oldPrice}</s>` : ''} 
            $${p.price}
          </p>
        </div>
      </div>
    `;
  }).join('');
}
