# Maison — Ceramic & Home Decor E-Shop

An editorial-style e-shop inspired by the OpenAI ChatGPT Images 2.0 announcement page. Features a dark hero, two distinct browsing modes, and a minimal product layout built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

---

## Project Structure

```
openai_web_copy/
├── index.html       # Page structure and markup
├── style.css        # All visual styles
├── script.js        # Product data + interactive behaviour
└── images/          # Product photos (drop new ones here)
```

---

## How to Run Locally

```bash
cd openai_web_copy
python3 -m http.server 8080
# then open http://localhost:8080
```

> Open via a local server, not `file://` — browsers block image loading from the filesystem.

---

## What You Can Modify

### 1. Add or change products — `script.js`

All product data lives in the `products` array at the top of `script.js`:

```js
const products = [
  {
    name: "Orbit Vase Set",        // Product title shown in both modes
    file: "61a2baE1W0L.jpg",       // Filename inside the images/ folder
    price: "€89",                  // Price string (any currency/format)
    tag: "Bestseller",             // Badge label — set to null to hide
    description: "..."             // Shown only in Classic mode
  },
  // Add more objects here, one per product
];
```

To add a product: drop the image in `images/`, then add a new object to the array.  
To remove a product: delete its object from the array.  
To reorder products: reorder the objects in the array.

---

### 2. Change shop name and copy — `index.html`

| What | Where in index.html |
|------|---------------------|
| Shop name (nav + footer) | `class="nav__logo"` and `class="footer__logo"` |
| Hero headline | `class="hero__title"` |
| Hero subtitle | `class="hero__sub"` |
| Hero meta line (date/category) | `class="hero__meta"` |
| About section text | `class="about__text"` |
| Footer contact info | `class="footer__col"` blocks |

---

### 3. Adjust colours — `style.css`

All colours are CSS variables at the top of `style.css`:

```css
:root {
  --black:   #000;       /* nav, hero, footer backgrounds */
  --white:   #fff;       /* text on dark backgrounds */
  --cream:   #f5f3ef;    /* classic mode background */
  --sand:    #e8e4dc;    /* about section background */
  --text:    #1a1a1a;    /* body text */
  --muted:   #666;       /* secondary text */
  --accent:  #c8a97a;    /* tag badges and classic mode labels */
}
```

---

### 4. Image mode behaviour — `script.js`

- **Scroll lock**: clicking any image slide locks/unlocks scroll. Controlled by `setLocked()`.
- **Counter**: updates automatically on scroll via `updateCounter()`.
- **Image sizing**: controlled by `.image-slide__img` in `style.css` — adjust `max-height` and `max-width` to taste.

---

### 5. Classic mode layout — `style.css`

The classic layout alternates image-left / image-right per item:

```css
.classic-item:nth-child(odd)  { grid-template-columns: 1.2fr 1fr; }
.classic-item:nth-child(even) { grid-template-columns: 1fr 1.2fr; }
```

Change these ratios to adjust how much space the image vs. text gets.

---

## Deployment

The site is static — any static host works:

- **GitHub Pages**: push to a repo, enable Pages from the repo settings.
- **Netlify / Vercel**: drag the project folder onto the dashboard.
- **Any web server**: copy the folder contents to your document root.
