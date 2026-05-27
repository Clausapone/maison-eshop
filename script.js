const products = [
  {
    name: "Orbit Vase Set",
    file: "61a2baE1W0L.jpg",
    price: "€89",
    tag: "Bestseller",
    description: "A pair of interlocking donut-form ceramic vases in matte sand finish. Inspired by Scandinavian craft — objects that don't compete with the room, they complete it."
  },
  {
    name: "Plissé Collection",
    file: "718mSV+B+QL._AC_.jpg",
    price: "€124",
    tag: "New",
    description: "Three ribbed ceramic vessels in ivory. The pleated surface catches natural light throughout the day, shifting subtly as the hours pass. Sold as a set of three."
  },
  {
    name: "Crystal Bud Vase",
    file: "image.png",
    price: "€65",
    tag: null,
    description: "Hand-blown glass vase with a faceted body. Designed for a single stem or a loose arrangement. Sits beautifully on a coffee table or shelf."
  },
  {
    name: "Matte Duo Vase",
    file: "image copy.png",
    price: "€78",
    tag: null,
    description: "A complementary pair in warm matte tones. Each vessel has its own character while harmonising with the other. Mix heights, mix moods."
  },
  {
    name: "Stone Series",
    file: "image copy 2.png",
    price: "€95",
    tag: "Limited",
    description: "Inspired by river stones smoothed over centuries. Each piece is slightly unique — the clay remembers the hand that shaped it."
  },
  {
    name: "Linen Tall Vase",
    file: "71m8Vp2YjyL._AC_SL1500_.jpg",
    price: "€55",
    tag: null,
    description: "A slender silhouette for single dramatic stems. The surface texture evokes raw linen — tactile and understated."
  },
  {
    name: "Arc Vessel",
    file: "bfe3f37a93bffcb17b53edf6f51b6bc4.jpg",
    price: "€110",
    tag: null,
    description: "An asymmetric form that challenges the expected. The arc body creates interesting shadows and becomes a sculptural element when empty."
  },
  {
    name: "Terracotta Pair",
    file: "2af16cafb7a5a18dedc181f805b54f00.jpg",
    price: "€82",
    tag: "New",
    description: "Warm earthy tones in a classic rounded form. These sit best in morning light — the colour deepens as the day progresses."
  },
  {
    name: "Fluted Pillar",
    file: "472455a4be457887d6ebdf2ff596b401.jpg",
    price: "€68",
    tag: null,
    description: "Vertical ridges catch light in delicate parallel lines. Functional as a vase but striking enough to stand alone as sculpture."
  },
  {
    name: "Wabi Collection",
    file: "7089061753404d31e41c38db6d9f45af.jpg",
    price: "€145",
    tag: "Collection",
    description: "Three pieces exploring the Japanese aesthetic of imperfection. Crackle glazes, deliberate asymmetry, subtle variations in tone — no two exactly alike."
  },
  {
    name: "Milk Glass Set",
    file: "079dfba2-bd80-4448-84f0-a8a1fc2b862e.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    price: "€99",
    tag: null,
    description: "Opaque white glass with a soft frosted surface. Light diffuses through the walls when a candle is placed inside. Day or night, it glows differently."
  },
  {
    name: "Earth & Form",
    file: "1fbd8be4-bbb7-408e-b67c-653ab66fe7b3.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    price: "€115",
    tag: "Exclusive",
    description: "Our most architectural piece. A collaboration with ceramicist Lena Vogel — her signature raw-edge finishing technique meets a minimal structural form."
  }
];

// ─── DOM REFERENCES ────────────────────────────────────────
const imageGallery  = document.getElementById('imageGallery');
const classicGallery = document.getElementById('classicGallery');
const modeToggle    = document.getElementById('modeToggle');
const scrollCounter = document.getElementById('scrollCounter');
const lockHint      = document.getElementById('lockHint');
const lockIcon      = document.getElementById('lockIcon');
const lockLabel     = document.getElementById('lockLabel');

// ─── BUILD IMAGE MODE ──────────────────────────────────────
function buildImageGallery() {
  products.forEach((p, i) => {
    const slide = document.createElement('div');
    slide.className = 'image-slide';
    slide.dataset.index = i;

    slide.innerHTML = `
      <div class="image-slide__img-wrap">
        <img class="image-slide__img" src="images/${encodeFilename(p.file)}" alt="${p.name}">
      </div>
    `;

    imageGallery.appendChild(slide);
  });

  // Entrance animation: add .visible when slide is ≥50% in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.index, 10);
        scrollCounter.textContent = `${idx + 1} / ${products.length}`;
      }
    });
  }, { root: imageGallery, threshold: 0.5 });

  imageGallery.querySelectorAll('.image-slide').forEach(s => observer.observe(s));
}

// ─── BUILD CLASSIC MODE ────────────────────────────────────
function buildClassicGallery() {
  products.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'classic-item';

    item.innerHTML = `
      <div class="classic-item__image">
        <img src="images/${encodeFilename(p.file)}" alt="${p.name}" loading="lazy">
      </div>
      <div class="classic-item__text">
        ${p.tag ? `<span class="classic-item__tag">${p.tag}</span>` : ''}
        <h2 class="classic-item__name">${p.name}</h2>
        <p class="classic-item__desc">${p.description}</p>
        <div class="classic-item__footer">
          <span class="classic-item__price">${p.price}</span>
          <button class="classic-item__btn" data-index="${i}">Add to Cart</button>
        </div>
      </div>
    `;

    classicGallery.appendChild(item);
  });
}

// ─── SCROLL LOCK (IMAGE MODE) ──────────────────────────────
let isLocked = false;

function setLocked(locked) {
  isLocked = locked;
  if (locked) {
    imageGallery.style.overflow = 'hidden';
    lockHint.classList.add('locked-state');
    lockIcon.textContent = '⊗';
    lockLabel.textContent = 'Scroll locked — click to continue';
  } else {
    imageGallery.style.overflow = '';
    lockHint.classList.remove('locked-state');
    lockIcon.textContent = '⊕';
    lockLabel.textContent = 'Click image to lock scroll';
  }
}

imageGallery.addEventListener('click', (e) => {
  // Don't toggle lock when clicking the cart button
  if (e.target.classList.contains('image-slide__cta')) return;
  setLocked(!isLocked);
});

// counter is updated by the IntersectionObserver inside buildImageGallery()

// ─── MODE SWITCHING ────────────────────────────────────────
function switchMode(mode) {
  const btns = modeToggle.querySelectorAll('.mode-btn');
  btns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));

  if (mode === 'image') {
    imageGallery.classList.remove('hidden');
    classicGallery.classList.add('hidden');
    scrollCounter.style.display = 'block';
    lockHint.classList.add('visible');
    setLocked(false);
  } else {
    classicGallery.classList.remove('hidden');
    imageGallery.classList.add('hidden');
    scrollCounter.style.display = 'none';
    lockHint.classList.remove('visible');
  }
}

modeToggle.addEventListener('click', (e) => {
  const btn = e.target.closest('.mode-btn');
  if (btn) switchMode(btn.dataset.mode);
});

// ─── ADD TO CART ───────────────────────────────────────────
function handleCartClick(btn, index) {
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = 'Add to Cart';
    btn.classList.remove('added');
  }, 2000);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.image-slide__cta, .classic-item__btn');
  if (btn) {
    e.stopPropagation();
    handleCartClick(btn, btn.dataset.index);
  }
});

// ─── ENCODE FILENAMES WITH SPECIAL CHARS ──────────────────
function encodeFilename(filename) {
  return filename.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

// ─── INIT ──────────────────────────────────────────────────
buildImageGallery();
buildClassicGallery();

// Show counter and hint for image mode (default)
scrollCounter.style.display = 'block';
lockHint.classList.add('visible');
