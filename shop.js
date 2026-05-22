// ============================================================
// GSYNCRO — Shop Page Script (shop.js)
// Manages products fetching, searching, sorting, and filtering
// ============================================================

const SHOP_CATEGORY_LABELS = {
  'street-style': 'Street Style',
  'office-wear': 'Office Wear',
  'casual': 'Casual',
  'night-luxe': 'Night Luxe',
  'ethnic': 'Ethnic Collection',
  'accessories': 'Accessories'
};

function getShopCategoryLabel(category) {
  if (!category) return 'Collection';
  return SHOP_CATEGORY_LABELS[category] || category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

let currentProducts = [];
let activeFilters = {
  category: 'all',
  search: '',
  sizes: [],
  inStockOnly: false,
  sortBy: 'default'
};

document.addEventListener('DOMContentLoaded', async () => {
  // Load products from Central GSYNCRO API
  currentProducts = await GSYNCRO_API.fetchProducts();

  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  const sortParam = params.get('sort');
  
  if (categoryParam) {
    activeFilters.category = categoryParam;
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (categoryParam !== 'ethnic') {
      tabs.forEach(tab => {
        if (tab.dataset.category === categoryParam) {
          tab.classList.add('active');
        }
      });
    }
    updateCategoryHeader(categoryParam);
  } else {
    updateCategoryHeader('all');
  }

  if (sortParam) {
    activeFilters.sortBy = sortParam;
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.value = sortParam;
    }
  }

  // Setup Event Listeners
  setupCategoryTabs();
  setupSearchInput();
  setupSizeChips();
  setupStockCheckbox();
  setupSortSelect();
  setupClearButton();

  // Render initial list
  applyFiltersAndRender();
});

// Update Header Titles based on selected category
function updateCategoryHeader(category) {
  const shopTitle = document.getElementById('shopTitle');
  const shopSubtitle = document.getElementById('shopSubtitle');
  const breadcrumb = document.getElementById('breadcrumbCategory');
  const headerEl = document.querySelector('.shop-header');

  let title = 'Our <em>Collection</em>';
  let subtitle = 'Thoughtfully curated luxury, tailored for the modern woman.';
  let crumb = 'Shop';

  switch (category) {
    case 'street-style':
      title = 'Street <em>Style</em>';
      subtitle = 'Bold, expressive, and comfortable everyday luxe dressing.';
      crumb = 'Street Style';
      break;
    case 'office-wear':
      title = 'Office <em>Wear</em>';
      subtitle = 'Sharp tailoring and double-breasted blazers that rule the boardroom.';
      crumb = 'Office Wear';
      break;
    case 'casual':
      title = 'Casual <em>Luxe</em>';
      subtitle = 'Effortless knit dresses, breezy linens, and elevated everyday items.';
      crumb = 'Casual';
      break;
    case 'night-luxe':
      title = 'Night <em>Luxe</em>';
      subtitle = 'Premium eveningwear, statement gowns, and glamorous pieces for every unforgettable night.';
      crumb = 'Night Luxe';
      break;
    case 'ethnic':
      title = 'A Celebration of <em>Heritage</em>';
      subtitle = 'Rooted in tradition. Reimagined for today. Curated ethnic pieces inspired by timeless elegance and artisan craft.';
      crumb = 'Ethnic Collection';
      break;
  }

  if (headerEl) {
    headerEl.classList.toggle('category-ethnic', category === 'ethnic');
    headerEl.classList.toggle('category-night-luxe', category === 'night-luxe');
  }

  const ethnicBanner = document.getElementById('ethnicCategoryBanner');
  if (ethnicBanner) {
    if (category === 'ethnic') {
      ethnicBanner.removeAttribute('hidden');
    } else {
      ethnicBanner.setAttribute('hidden', '');
    }
  }

  // Hide normal category tabs for premium ethnic experience
const categoryTabs = document.getElementById('categoryTabs');

if (categoryTabs) {
  if (category === 'ethnic') {
    categoryTabs.style.display = 'none';
  } else {
    categoryTabs.style.display = 'flex';
  }
}

  if (shopTitle) shopTitle.innerHTML = title;
  if (shopSubtitle) shopSubtitle.textContent = subtitle;
  if (breadcrumb) {
    if (crumb === 'Shop') {
      breadcrumb.style.display = 'none';
      const separator = breadcrumb.previousElementSibling;
      if (separator) separator.style.display = 'none';
    } else {
      breadcrumb.style.display = 'inline';
      breadcrumb.textContent = crumb;
      const separator = breadcrumb.previousElementSibling;
      if (separator) separator.style.display = 'inline';
    }
  }

  // Set Editorial Category Image Backdrops
  if (headerEl) {
    const bgImages = {
      'all': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
      'street-style': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=80',
      'office-wear': 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1600&q=80',
      'casual': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=80',
      'night-luxe': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600&q=85',
      'ethnic': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=85'
    };
    const bg = bgImages[category] || bgImages['all'];
    if (category === 'ethnic') {
      headerEl.style.background = `linear-gradient(105deg, rgba(10, 10, 8, 0.55) 0%, rgba(247, 244, 239, 0.82) 55%, rgba(247, 244, 239, 0.94) 100%), url('${bg}') center/cover`;
    } else if (category === 'night-luxe') {
      headerEl.style.background = `linear-gradient(115deg, rgba(10, 10, 8, 0.5) 0%, rgba(247, 244, 239, 0.78) 50%, rgba(247, 244, 239, 0.92) 100%), url('${bg}') center/cover`;
    } else {
      headerEl.style.background = `linear-gradient(rgba(247, 244, 239, 0.88), rgba(247, 244, 239, 0.95)), url('${bg}') center/cover`;
    }
  }
}

// Category tabs click handler
function setupCategoryTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      activeFilters.category = tab.dataset.category;
      updateCategoryHeader(tab.dataset.category);
      
      // Update browser URL query without reloading the page
      const newUrl = activeFilters.category === 'all' 
        ? 'shop.html' 
        : `shop.html?category=${activeFilters.category}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

      applyFiltersAndRender();
    });
  });
}

// Real-time search handler
function setupSearchInput() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.toLowerCase().trim();
      applyFiltersAndRender();
    });
  }
}

// Size chips toggling
function setupSizeChips() {
  const sizeChips = document.querySelectorAll('.size-chip');
  sizeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const sizeVal = chip.dataset.size;
      
      if (chip.classList.contains('active')) {
        activeFilters.sizes.push(sizeVal);
      } else {
        activeFilters.sizes = activeFilters.sizes.filter(s => s !== sizeVal);
      }
      applyFiltersAndRender();
    });
  });
}

// Stock filter checkbox
function setupStockCheckbox() {
  const checkbox = document.getElementById('stockCheckbox');
  if (checkbox) {
    checkbox.addEventListener('change', (e) => {
      activeFilters.inStockOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }
}

// Sort dropdown selection
function setupSortSelect() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }
}

// Clear all filters action
function setupClearButton() {
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      window.clearAllFilters();
    });
  }
}

window.clearAllFilters = function() {
  const params = new URLSearchParams(window.location.search);
const isEthnicPage = params.get('category') === 'ethnic';

activeFilters.category = isEthnicPage ? 'ethnic' : 'all';
  activeFilters.search = '';
  activeFilters.sizes = [];
  activeFilters.inStockOnly = false;
  activeFilters.sortBy = 'default';

  // Reset category tabs
  // Reset category tabs (skip for ethnic experience)
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(t => t.classList.remove('active'));

if (!isEthnicPage && tabs[0]) {
  tabs[0].classList.add('active');
}

  // Reset Input UI
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  // Reset Checkbox
  const checkbox = document.getElementById('stockCheckbox');
  if (checkbox) checkbox.checked = false;

  // Reset Select dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'default';

  // Reset Size Chips
  const sizeChips = document.querySelectorAll('.size-chip');
  sizeChips.forEach(c => c.classList.remove('active'));

  // Reset header
  updateCategoryHeader('all');

  // Reset browser URL
  window.history.pushState({ path: 'shop.html' }, '', 'shop.html');

  applyFiltersAndRender();
};

// Filter, Sort, and Render products
function applyFiltersAndRender() {
  let filtered = [...currentProducts];

  // 1. Category Filter (ethnic is exclusive — hidden from "All" and standard tabs)
  if (activeFilters.category === 'all') {
    filtered = filtered.filter(p => p.category !== 'ethnic');
  } else {
    filtered = filtered.filter(p => p.category === activeFilters.category);
  }

  // 2. Search Filter (checks name, description)
  if (activeFilters.search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(activeFilters.search) || 
      (p.description && p.description.toLowerCase().includes(activeFilters.search))
    );
  }

  // 3. Size Filter
  if (activeFilters.sizes.length > 0) {
    filtered = filtered.filter(p => 
      p.sizes.some(size => activeFilters.sizes.includes(size))
    );
  }

  // 4. Stock Filter
  if (activeFilters.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }

  // 5. Sorting
  if (activeFilters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'newest') {
    // Sort "New" badged items first
    filtered.sort((a, b) => (b.badge === 'New') - (a.badge === 'New'));
  } else if (activeFilters.sortBy === 'bestseller') {
    // Sort "Bestseller" badged items first
    filtered.sort((a, b) => (b.badge === 'Bestseller') - (a.badge === 'Bestseller'));
  }

  // Render Layout
  const grid = document.getElementById('shopGrid');
  const countEl = document.getElementById('resultsCount');
  const emptyState = document.getElementById('emptyState');

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    if (grid) grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (grid) {
    grid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = filtered.map(p => {
      const categoryLabel = getShopCategoryLabel(p.category);
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
        <div class="product-card" onclick="navigateToDetail(event, ${p.id})">
          <div class="product-img">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
            ${badgeHTML}
            ${outOfStockLabel}
            <button class="product-wish" onclick="toggleWish(event, this)" aria-label="Wishlist">♡</button>
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
              ? `<button class="add-cart" onclick="quickAdd(event, ${p.id}, '${p.sizes[0]}')">Add to Bag</button>`
              : `<button class="add-cart out-of-stock" disabled>Out of Stock</button>`
            }
          </div>
        </div>
      `;
    }).join('');
  }
}

// Redirect card clicks to details page
window.navigateToDetail = function(e, id) {
  // Prevent redirection if user clicks add-to-bag button or wishlist button
  if (e.target.closest('.add-cart') || e.target.closest('.product-wish')) {
    return;
  }
  window.location.href = `product-detail.html?id=${id}`;
};

// Wishlist interaction simulation
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

// Quick Add from Card
window.quickAdd = function(e, id, defaultSize) {
  e.stopPropagation();
  Cart.add(id, defaultSize, 1);
  showToast('Item added to your bag');
  openCart();
};
