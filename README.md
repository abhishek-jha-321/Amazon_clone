# Amazon Clone (React + Tailwind CSS)

A modern, production-grade frontend clone of the Amazon desktop & mobile web experience built with **React 18**, **Tailwind CSS**, and **Vite**.

---

## 🚀 Features & Amazon Comparison

| Feature | Original Legacy Version | Enhanced React + Tailwind Version |
| :--- | :--- | :--- |
| **Architecture** | Plain static HTML file & single CSS file | Modular React component architecture with Context API state management |
| **Styling** | Vanilla CSS with layout and syntax typos | Modern Tailwind CSS utility system with authentic Amazon color palette |
| **Header** | Incomplete text labels, missing search button & cart icon | Authentic Amazon Navbar with search category dropdown, dynamic search bar, Deliver-to location modal, Account & Lists hover menu, and live Cart counter |
| **Sub-Header** | Static list without sidebar interaction | Interactive Sub-navbar with "All" hamburger button launching a slide-out drawer menu |
| **Navigation Drawer** | None | Full slide-in sidebar menu with category sections, account greeting, and smooth transition animations |
| **Hero Section** | Single static background image | Multi-slide animated carousel with slide controls and seamless gradient fade overlay |
| **Product Showcase** | Not implemented | Amazon 2x2 quadrant cards ("Gaming accessories", "Refresh your space", etc.), single deal cards, and horizontal scrollable product rows |
| **Cart Experience** | Not implemented | Slide-over cart drawer with free-shipping threshold tracker ($35), quantity adjusters, item deletion, live subtotal, and persistence via `localStorage` |
| **Product Modal** | None | Interactive Quick View modal with ratings, Prime badge, savings calculator, quantity picker, and "Add to Cart" / "Buy Now" |
| **Search Functionality**| Static placeholder `<input>` | Real-time search engine filtering products dynamically with keyword highlighting |
| **Footer** | Missing | Multi-column footer ("Get to Know Us", "Make Money with Us", etc.), "Back to top" smooth scrolling, international selectors, and subsidiary grid |

---

## 📁 Industry-Standard Folder Structure

```text
amazon-clone/
├── public/
│   ├── amazon-logo.png            # High-resolution Amazon brand asset
│   └── hero-image.jpg             # High-impact banner asset
├── src/
│   ├── assets/                    # Static image/media assets
│   ├── components/
│   │   ├── common/
│   │   │   ├── PrimeBadge.jsx     # Amazon Prime checkmark badge
│   │   │   └── Rating.jsx         # Star rating component with review count
│   │   ├── layout/
│   │   │   ├── Header.jsx         # Main sticky navbar with search & account popover
│   │   │   ├── SubHeader.jsx      # Secondary bar with "All" drawer trigger
│   │   │   ├── SideDrawer.jsx     # Amazon hamburger sliding menu
│   │   │   └── Footer.jsx         # 4-column footer, "Back to top", subsidiary grid
│   │   ├── home/
│   │   │   ├── HeroBanner.jsx     # Multi-banner auto-carousel with gradient fade
│   │   │   ├── ProductCardQuad.jsx # 2x2 grid cards (e.g. Gaming, Home, Tech)
│   │   │   ├── ProductCardSingle.jsx # Featured single deal cards
│   │   │   └── ProductSlider.jsx  # Horizontal scrollable product rows
│   │   ├── cart/
│   │   │   └── CartDrawer.jsx     # Slide-over cart with free shipping progress
│   │   └── product/
│   │       └── ProductQuickView.jsx # Product detail modal with buying options
│   ├── context/
│   │   ├── CartContext.jsx        # Cart state, quantities, subtotal, and localStorage
│   │   └── UIContext.jsx          # Modals, drawers, and global search state
│   ├── data/
│   │   ├── bannerData.js          # Hero banner carousel data
│   │   ├── mockProducts.js        # Quad categories, deals, and product list
│   │   └── navigationData.js      # Sidebar departments and footer columns
│   ├── utils/
│   │   └── formatters.js          # Currency and rating formatting helpers
│   ├── App.jsx                    # Root layout & search results handler
│   ├── index.css                  # Tailwind CSS directives & scrollbar styles
│   └── main.jsx                   # React 18 DOM entry point
├── index.html                     # HTML5 template for Vite
├── package.json                   # Dependencies & build scripts
├── postcss.config.js              # PostCSS plugins
├── tailwind.config.js             # Tailwind configuration & Amazon custom palette
└── vite.config.js                 # Vite dev server and build configuration
```

---

## 🛠️ How to Run

### Start Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`**.

### Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

