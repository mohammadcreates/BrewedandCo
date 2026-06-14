# ☕ Brewed & Co. — Coffee Shop Website

A modern, fully responsive coffee shop website built with **React**, **Vite**, and **Tailwind CSS v4**. This is a frontend project that will later evolve into a full-stack application with Node.js and PostgreSQL.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| React Router DOM v6 | Client-side routing |
| Context API + useReducer | Global cart state management |

---

## 📁 Project Structure

```
src/
├── assets/
│   └── images/
│       └── whish-logo.webp       # Whish Money payment logo
├── components/
│   ├── Navbar.jsx                # Sticky navbar with cart icon
│   ├── Footer.jsx                # Site-wide footer
│   └── ScrollToTop.jsx           # Auto scroll to top on route change
├── context/
│   └── CartContext.jsx           # Global cart state (useReducer)
├── pages/
│   ├── Home.jsx                  # Landing page
│   ├── Menu.jsx                  # Full menu with category filters
│   ├── About.jsx                 # About page with team & values
│   └── Checkout.jsx              # Combined checkout & shipping page
├── styles/
│   └── tokens.js                 # Design tokens (colors, inputs, buttons)
├── App.jsx                       # Root component & routes
├── main.jsx                      # React entry point
└── index.css                     # Tailwind import
```

---

## 📄 Pages

### Home `/`
- Hero section with tagline **"Breathe. Sip. Relax."**
- High Protein Menu CTA banner with glowing button
- Featured items section (Espresso, Herbal Tea, Fresh Smoothie)
- Our Story snippet linking to About page
- Locations section with 3 Beirut branches

### Menu `/menu`
- Sticky filter bar (All, Coffee, Tea, Smoothies, Food)
- Filter persists via URL search params (`?filter=Coffee`)
- Food section has 4 subsections: **Treats**, **Light Love**, **Guilt Free**, **Power Bowls**
- Badges per item: Hot, Iced, Cold, Vegan, New, Low Cal, High Protein
- Add to Cart button on every item
- "Crafting new special" animated sparkle placeholder

### About `/about`
- Hero with brand quote
- Brand story with stats card (10+ years, 3 locations, 500+ daily customers, 40+ items)
- Values section (Quality First, Everyone Welcome, Mindful Choices)
- Team section (3 members with initials avatars)
- CTA that scrolls to Locations section on Home page

### Checkout `/checkout`
- Combined cart review + shipping + payment on one page
- Steps indicator: Cart → Shipping → Payment
- Contact information form (first name, last name, email, phone)
- Delivery address form (street, city, district, notes)
- Payment methods: **Whish Money** (with logo) and **Cash on Delivery**
- Charity donation section with suggested amounts ($1, $2, $5, $10) + custom input
- Promo code support (3 active codes)
- Order summary (sticky on desktop) with subtotal, delivery, tax, charity, total
- Full form validation with red error states
- Email format validation (`@domain.com`)
- Lebanese phone validation (03, 70, 71, 76, 78, 81 + 6 digits)
- Order success popup with Whish payment reminder if applicable

---

## 🛒 Cart Features

Built with **React Context API** and **useReducer**:

- Add items to cart from Menu page
- Increment / Decrement item quantity
- Remove individual items
- Clear entire cart
- Cart count badge in Navbar
- Persists across page navigation (in-memory, resets on refresh)
- Empty cart state with Browse Menu CTA

---

## 💳 Promo Codes

| Code | Discount |
|---|---|
| `BREWED10` | 10% off |
| `WELCOME15` | 15% off |
| `PROTEIN20` | 20% off |

> **Note:** Promo codes are currently hardcoded on the frontend. When the backend is built with Node.js and PostgreSQL, they will be validated server-side.

---

## 🎨 Design System

Design tokens are centralized in `src/styles/tokens.js`:

```js
tokens.pageTitle      // h1 page titles
tokens.sectionTitle   // h2 section titles
tokens.label          // form labels
tokens.input          // form inputs
tokens.select         // select dropdowns
tokens.card           // white card containers
tokens.btnPrimary     // dark primary button
tokens.btnSecondary   // amber secondary button
tokens.muted          // muted body text
tokens.hint           // small hint text
tokens.price          // item prices
tokens.totalPrice     // order total
tokens.inputError     // red error input state
```

To change any style globally, update `tokens.js` — all components update automatically.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/brewed-and-co.git
cd brewed-and-co

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🗺️ Locations

| Branch | Address | Hours |
|---|---|---|
| City Center | 12 Main Street, Downtown | Mon–Fri 7am–9pm, Sat–Sun 8am–10pm |
| Corniche Branch | 45 Corniche Avenue, Beirut | Mon–Fri 7am–10pm, Sat–Sun 8am–11pm |
| Achrafieh Lounge | 8 Sassine Square, Achrafieh | Mon–Fri 8am–9pm, Sat–Sun 9am–10pm |

---

## 🔮 Roadmap

This project will evolve into a full-stack application:

- [ ] **Backend** — Node.js + Express REST API
- [ ] **Database** — PostgreSQL + Prisma ORM
- [ ] **Authentication** — User accounts & order history
- [ ] **Real promo codes** — Server-side validation
- [ ] **Whish Money integration** — Live payment webhook
- [ ] **Admin dashboard** — Order & menu management
- [ ] **Migration to Next.js** — SSR, SEO optimization

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "vite": "^8.0.0"
  }
}
```

---

## 👨‍💻 Author

Built by **Mohammad Walid Al Masri** — Software Developer based in Beirut, Lebanon.

LinkedIn: www.linkedin.com/in/mohammad-walid-al-masri-47749b242
GitHub: https://github.com/mohammadcreates/BrewedandCo
---

## 📝 License

This project is for personal and portfolio use.
