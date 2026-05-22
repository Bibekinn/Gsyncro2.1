// ============================================================
// GSYNCRO — Central Product & Cart Store
// All pages import this file to share data & cart state
// ============================================================

const GSYNCRO_PRODUCTS = [
  // ── STREET STYLE ──────────────────────────────────────────
  {
    id: 107,
    name: 'Urban Oversized Blazer',
    category: 'street-style',
    price: 128,
    oldPrice: null,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Relaxed oversized blazer in soft camel — layers effortlessly over denim, dresses, and tailoring.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 108,
    name: 'Wide Leg Denim Set',
    category: 'street-style',
    price: 98,
    oldPrice: 120,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'High-rise wide leg jeans with a cropped utility jacket. Modern street luxe for everyday confidence.',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 109,
    name: 'Layered Knit Co-ord',
    category: 'street-style',
    price: 86,
    oldPrice: null,
    badge: null,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ribbed knit top and matching midi skirt in charcoal. Minimal, elevated, and endlessly wearable.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85'
    ],
    inStock: true
  },

  // ── NIGHT LUXE ──────────────────────────────────────────
  {
    id: 101,
    name: 'Silk Evening Gown',
    category: 'night-luxe',
    price: 189,
    oldPrice: 240,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A floor-length silk evening gown with delicate embroidery along the neckline. Perfect for galas, weddings, and celebrations.',
    images: [
      'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 102,
    name: 'Sequin Cocktail Dress',
    category: 'night-luxe',
    price: 135,
    oldPrice: 170,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Stunning sequin cocktail dress that catches every light. Knee-length silhouette with a subtle slit.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=85',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=85'
    ],
    inStock: false // Out of stock to test empty/stock badges
  },
  {
    id: 103,
    name: 'Velvet Wrap Dress',
    category: 'night-luxe',
    price: 158,
    oldPrice: null,
    badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Rich burgundy velvet wrap dress with a flattering adjustable tie waist. Timeless and elegant.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 104,
    name: 'Floral Maxi Gown',
    category: 'night-luxe',
    price: 112,
    oldPrice: null,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Flowing floral maxi gown in a romantic print. Features a sweetheart neckline and tiered skirt.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 105,
    name: 'Gold Shimmer Jumpsuit',
    category: 'night-luxe',
    price: 145,
    oldPrice: 185,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Head-turning gold shimmer wide-leg jumpsuit. A bold statement piece for any special occasion.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 106,
    name: 'Lace Bodycon Dress',
    category: 'night-luxe',
    price: 98,
    oldPrice: null,
    badge: null,
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant black lace bodycon dress with sheer panels. Perfect for dinner dates and parties.',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85'
    ],
    inStock: true
  },

  // ── OFFICE WEAR ─────────────────────────────────────────
  {
    id: 201,
    name: 'Power Blazer Set',
    category: 'office-wear',
    price: 145,
    oldPrice: null,
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Tailored double-breasted blazer and matching trousers in a premium wool blend. Commands the boardroom.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=85',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 202,
    name: 'Classic Shirt Dress',
    category: 'office-wear',
    price: 88,
    oldPrice: 110,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Crisp white shirt dress with a nipped-in waist and subtle pleat detail. A wardrobe essential.',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=85',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 203,
    name: 'Structured Pencil Skirt',
    category: 'office-wear',
    price: 72,
    oldPrice: null,
    badge: 'Bestseller',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'High-waisted structured pencil skirt in classic navy. Pairs perfectly with any blouse or blazer.',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5218db7b4a?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 204,
    name: 'Silk Blouse Collection',
    category: 'office-wear',
    price: 95,
    oldPrice: null,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Luxe silk blouse with a draped front and cuffed sleeves. Available in ivory and blush.',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 205,
    name: 'Wide Leg Trousers',
    category: 'office-wear',
    price: 110,
    oldPrice: 135,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Elevated wide-leg trousers in a camel-toned crepe fabric. Effortlessly chic for any office setting.',
    images: [
      'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 206,
    name: 'Tailored Coat Dress',
    category: 'office-wear',
    price: 168,
    oldPrice: null,
    badge: 'New',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Sophisticated coat dress in charcoal grey with gold button accents. The ultimate power outfit.',
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85'
    ],
    inStock: true
  },

  // ── CASUAL ──────────────────────────────────────────────
  {
    id: 301,
    name: 'Linen Summer Dress',
    category: 'casual',
    price: 79,
    oldPrice: 99,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Breezy linen midi dress in warm terracotta. Easy, effortless, and endlessly wearable all summer.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 302,
    name: 'Relaxed Denim Co-ord',
    category: 'casual',
    price: 92,
    oldPrice: null,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Matching denim jacket and wide-leg pants in a washed indigo. The coolest casual set of the season.',
    images: [
      'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=800&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 303,
    name: 'Knit Midi Dress',
    category: 'casual',
    price: 85,
    oldPrice: null,
    badge: 'Bestseller',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Soft ribbed knit midi dress that hugs in all the right places. Wear it day to night effortlessly.',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 304,
    name: 'Oversized Linen Shirt',
    category: 'casual',
    price: 58,
    oldPrice: null,
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Breathable oversized linen shirt in classic white. Tuck it in, tie it up, or let it flow.',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=85'
    ],
    inStock: false
  },
  {
    id: 305,
    name: 'Flowy Boho Skirt',
    category: 'casual',
    price: 65,
    oldPrice: 82,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Romantic boho midi skirt in a floral cotton print. Light, free, and perfect for weekend adventures.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 306,
    name: 'Stripe Crop Top Set',
    category: 'casual',
    price: 74,
    oldPrice: null,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Nautical stripe crop top and matching high-waist shorts. Fresh and fun for sunny days.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85'
    ],
    inStock: true
  },

  // ── ETHNIC ──────────────────────────────────────────────
  {
    id: 401,
    name: 'Embroidered Kurta Set',
    category: 'ethnic',
    price: 115,
    oldPrice: null,
    badge: 'Bestseller',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Intricately hand-embroidered kurta with matching palazzo pants. Celebrates the heritage of South Asian craft.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 402,
    name: 'Silk Saree — Midnight',
    category: 'ethnic',
    price: 195,
    oldPrice: 240,
    badge: 'Sale',
    sizes: ['Free Size'],
    description: 'Pure silk saree in a deep midnight blue with gold zari border. Draped elegance for every celebration.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 403,
    name: 'Anarkali Suit — Rose',
    category: 'ethnic',
    price: 138,
    oldPrice: null,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Flared Anarkali suit in soft rose with delicate mirror embroidery. A showstopper at any festive occasion.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 404,
    name: 'Lehenga Choli Set',
    category: 'ethnic',
    price: 225,
    oldPrice: 280,
    badge: 'Sale',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Bridal-inspired lehenga choli with heavy embroidery and a flowing dupatta. Fit for celebrations.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 405,
    name: 'Block Print Salwar',
    category: 'ethnic',
    price: 88,
    oldPrice: null,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Hand block-printed cotton salwar kameez in earthy tones. Comfortable, casual ethnic wear for everyday.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 406,
    name: 'Chanderi Dupatta Set',
    category: 'ethnic',
    price: 105,
    oldPrice: null,
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Lightweight Chanderi silk top and pants with a sheer embroidered dupatta. Effortlessly elegant.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85'
    ],
    inStock: true
  },

  // ── ACCESSORIES ─────────────────────────────────────────
  {
    id: 501,
    name: 'Gold Statement Earrings',
    category: 'accessories',
    price: 45,
    oldPrice: null,
    badge: 'New',
    sizes: ['One Size'],
    description: 'Bold gold-toned drop earrings with intricate filigree detail. Makes every outfit instantly elevated.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 502,
    name: 'Handwoven Silk Scarf',
    category: 'accessories',
    price: 68,
    oldPrice: 89,
    badge: 'Sale',
    sizes: ['One Size'],
    description: 'Luxurious hand-loomed silk scarf in a rich jewel-tone palette. Wear it as a scarf, headband, or bag accessory.',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 503,
    name: 'Leather Mini Tote',
    category: 'accessories',
    price: 125,
    oldPrice: null,
    badge: 'Bestseller',
    sizes: ['One Size'],
    description: 'Structured genuine leather mini tote with gold hardware. Fits your essentials and then some.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 504,
    name: 'Layered Chain Necklace',
    category: 'accessories',
    price: 55,
    oldPrice: null,
    badge: 'New',
    sizes: ['One Size'],
    description: 'Delicate multi-strand gold chain necklace with a subtle pendant. The perfect layering piece.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 505,
    name: 'Tortoise Shell Sunnies',
    category: 'accessories',
    price: 38,
    oldPrice: null,
    badge: null,
    sizes: ['One Size'],
    description: 'Classic cat-eye sunglasses in tortoiseshell acetate with UV400 lenses. Timeless and chic.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=85'
    ],
    inStock: true
  },
  {
    id: 506,
    name: 'Embroidered Clutch',
    category: 'accessories',
    price: 89,
    oldPrice: 110,
    badge: 'Sale',
    sizes: ['One Size'],
    description: 'Hand-embroidered satin clutch with a gold chain strap. The evening bag you\'ll reach for again and again.',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=85'
    ],
    inStock: true
  }
];

// Backend-ready API methods simulating database lookup
const GSYNCRO_API = {
  async fetchProducts() {
    // Return a copy of the products to simulate database fetch
    return [...GSYNCRO_PRODUCTS];
  },
  async fetchProductById(id) {
    const product = GSYNCRO_PRODUCTS.find(p => p.id === Number(id));
    return product ? { ...product } : null;
  },
  async fetchRelatedProducts(category, excludeId) {
    return GSYNCRO_PRODUCTS
      .filter(p => p.category === category && p.id !== Number(excludeId))
      .slice(0, 4)
      .map(p => ({ ...p }));
  }
};

// ── CART (localStorage so it persists across pages) ──────
const Cart = {
  get() {
    try {
      return JSON.parse(localStorage.getItem('gsyncro_cart') || '[]');
    } catch (e) {
      return [];
    }
  },
  save(cart) {
    localStorage.setItem('gsyncro_cart', JSON.stringify(cart));
  },
  add(productId, size, qty = 1) {
    const cart = Cart.get();
    const product = GSYNCRO_PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const key = `${productId}-${size}`;
    const existing = cart.find(c => c.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        key,
        id: productId,
        size,
        qty,
        name: product.name,
        price: product.price,
        img: product.images[0],
        category: product.category
      });
    }
    Cart.save(cart);
    Cart.updateBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },
  remove(key) {
    const cart = Cart.get().filter(c => c.key !== key);
    Cart.save(cart);
    Cart.updateBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },
  changeQty(key, delta) {
    const cart = Cart.get();
    const item = cart.find(c => c.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      Cart.remove(key);
      return;
    }
    Cart.save(cart);
    Cart.updateBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },
  total() {
    return Cart.get().reduce((s, c) => s + (c.price * c.qty), 0);
  },
  count() {
    return Cart.get().reduce((s, c) => s + c.qty, 0);
  },
  updateBadge() {
    const count = Cart.count();
    // Update badge in nav actions
    const badges = document.querySelectorAll('#cartCount');
    badges.forEach(b => {
      b.textContent = count;
    });

    // Update drawer header total bag count
    const drawerCounts = document.querySelectorAll('#bagCount');
    drawerCounts.forEach(dc => {
      dc.textContent = count;
    });
  }
};

// Initialize badges when store loaded
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
});
