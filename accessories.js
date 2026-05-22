// ============================================================
// GSYNCRO — Accessories Page Script (accessories.js)
// Loads accessories from the central store and handles type filtering
// ============================================================

let accessoriesList = [];
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch all products from central store
  const allProducts = await GSYNCRO_API.fetchProducts();

  // Filter to only accessories category
  accessoriesList = allProducts.filter(p => p.category === 'accessories');

  // Setup filter button click listeners
  setupFilterButtons();

  // Initial render
  renderProducts();
});

function setupFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });
}

function renderProducts() {
  // Apply filtering based on subcategories inferred from product name/description
  const filtered = accessoriesList.filter(p => {
    if (activeFilter === 'all') return true;
    
    const nameLower = p.name.toLowerCase();
    
    if (activeFilter === 'jewellery') {
      return nameLower.includes('earrings') || nameLower.includes('necklace') || nameLower.includes('chain');
    }
    if (activeFilter === 'bags') {
      return nameLower.includes('tote') || nameLower.includes('clutch') || nameLower.includes('bag');
    }
    if (activeFilter === 'scarves') {
      return nameLower.includes('scarf');
    }
    if (activeFilter === 'sunglasses') {
      return nameLower.includes('sunnies') || nameLower.includes('glasses') || nameLower.includes('sunglasses');
    }
    return false;
  });

  const countEl = document.getElementById('count');
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
  }

  const gridEl = document.getElementById('productsGrid');
  if (!gridEl) return;

  gridEl.innerHTML = filtered.map(p => {
    const isNewBadge = p.badge === 'New' ? 'new-badge' : '';
    // Infer subcategory type label
    let typeLabel = 'Accessory';
    const nameLower = p.name.toLowerCase();
    if (nameLower.includes('earrings') || nameLower.includes('necklace')) typeLabel = 'Jewellery';
    else if (nameLower.includes('tote') || nameLower.includes('clutch')) typeLabel = 'Bag';
    else if (nameLower.includes('scarf')) typeLabel = 'Scarf';
    else if (nameLower.includes('sunnies')) typeLabel = 'Sunglasses';

    return `
      <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'">
        <div class="product-img">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge ${isNewBadge}">${p.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <p class="product-type">${typeLabel}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">
            ${p.oldPrice ? `<s>$${p.oldPrice}</s>` : ''}
            $${p.price}
          </p>
          <button class="add-cart" onclick="addAccessoryToBag(event, ${p.id}, '${p.sizes[0]}')">
            Add to Bag
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Handler for quick adding accessories
window.addAccessoryToBag = function(e, id, size) {
  e.stopPropagation();
  Cart.add(id, size, 1);
  showToast('Item added to your bag');
  openCart();
};