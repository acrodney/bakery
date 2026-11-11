# Mama Tunde's Bakery 🧁

A warm, elegant, and mobile-first 5-page website built for **Mama Tunde's Bakery** in Victoria Island, Lagos.

Designed specifically to meet the **5-of-5 Bakery Deliverables**:
1. **Header with Identity**: Mama Tunde's Bakery name, one-line tagline (*"Freshly baked artisan cakes and treats made with love every day"*), and the shop street address (*"14 Adeola Odeku Street, Victoria Island, Lagos"*).
2. **At Least Six Cake Cards**: 7 artisanal cakes and pastries shown as cards, each featuring a delicious photo, cake name, description, and price in Nigerian Naira (₦).
3. **Opening Hours with Closed Day Clearly Marked**: Complete 7-day schedule with Sunday clearly marked as **Closed**.
4. **"Order on Telegram" Buttons**: Prominently placed at the top (header and hero) and again at the bottom, directly opening the bakery chat at [`https://t.me/MamaTundesBakery`](https://t.me/MamaTundesBakery).
5. **Map Link & 360px Phone Responsiveness**: Direct **"View Shop on Google Maps"** navigation link and responsive embedded map, fully readable on a 360px phone with **zero sideways scrolling**.

---

## 🌟 Highlights & Features

- **📱 Mobile-First Experience**:
  - Sticky bottom thumb-navigation bar for effortless browsing on smartphones.
  - Floating and prominent **"Order on Telegram"** action buttons throughout the user journey.
  - Responsive hamburger drawer on mobile and clean top navigation on desktop.
  - Touch-friendly tap targets, smooth micro-interactions, and fast load times.

- **🍰 Best Cakes with Transparent Prices**:
  - Filterable cake menu: Celebration Cakes, Everyday Loaves & Bundts, and Savory Meat Pies.
  - Clear pricing displayed in Nigerian Naira (₦).
  - Serving sizes, flavor profiles, and allergen/ingredient descriptions.
  - Every cake card features a direct **"Order on Telegram"** button.

- **⏰ Live Opening Hours & Status**:
  - Dynamic real-time calculation showing **"Open Now • Closes at 7:00 PM"** or **"Closed Today (Sunday) • Opens Mon 7:30 AM"**.
  - Highlights today's day of the week automatically in the weekly schedule.

- **📍 Map & Bakery Location**:
  - Storefront address with landmarks: 14 Adeola Odeku St, Victoria Island, Lagos.
  - Direct **"View Shop on Google Maps"** navigation button.
  - Embedded responsive Google Map.
  - Dedicated parking bays and express delivery coverage info.

- **💬 Order on Telegram Integration**:
  - Direct link to `@MamaTundesBakery`.
  - **Interactive Cake Order Builder**: Customers can customize their cake flavor, size, inscription (e.g. *"Happy 30th Birthday!"*), preferred date, and notes, generating a pre-filled Telegram message with one tap.
  - Ordering FAQs covering lead times, delivery areas, and payment options.

---

## 📄 The 5 Pages

1. **Home (`index.html`)**:
   Delivers all 5 core requirements on a single, stunning, mobile-responsive page: header with address & tagline, 7 cake cards with prices in Naira, 7-day hours with Sunday marked Closed, top and bottom Telegram buttons, and map link.
2. **Best Cakes & Prices (`cakes.html`)**:
   Comprehensive filterable menu with signature treats.
3. **Our Story (`about.html`)**:
   Mama Tunde's 25-year baking journey, 100% pure butter philosophy, kitchen rules, and stats.
4. **Hours & Location (`location.html`)**:
   Full weekly operating schedule, live status badge, physical address with landmarks, embedded map, and Google Maps direct link.
5. **How to Order Guide (`order.html`)**:
   3-step ordering process, interactive Custom Cake Order Builder with live message generator, and collapsible FAQ accordion.

---

## 🚀 Getting Started

No build tools, bundlers, or package installations needed!

Simply open `index.html` in any web browser:
```bash
# Preview locally using Python's built-in HTTP server:
python3 -m http.server 8000
```
Then visit `http://localhost:8000` on your desktop or mobile phone.

---

## 📁 Project Structure

```
bakery/
├── index.html           # Main home page (fulfills 5 of 5 deliverables)
├── cakes.html           # Best cakes & prices menu
├── about.html           # Heritage & story of Mama Tunde
├── location.html        # Opening hours & Google Map link
├── order.html           # Telegram ordering guide & order builder
├── css/
│   └── style.css        # Warm artisanal styling, mobile-first CSS
├── js/
│   └── main.js          # Navigation, live opening hours, order builder
├── assets/
│   └── images/          # Fresh cake photos & bakery visuals
│       ├── hero-display.jpg
│       ├── red-velvet.jpg
│       └── chocolate-cake.jpg
└── README.md
```

---

## 🧁 Contact & Ordering

- **Bakery Storefront**: 14 Adeola Odeku St, Victoria Island, Lagos, Nigeria
- **Telegram**: [@MamaTundesBakery](https://t.me/MamaTundesBakery)
- **Phone**: +234 (0) 803 123 4567
