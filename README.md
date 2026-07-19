# 🚌 GoRutes — Surat BRTS Bus Ticket Generator & Simulator

<p align="center">
  <img src="assets/gorutes_logo.png" alt="GoRutes Logo" width="200">
</p>

<p align="center">
  <strong>A Premium Progressive Web App (PWA) for Surat BRTS Digital Bus Ticketing</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-PWA-blueviolet?style=for-the-badge" alt="PWA">
  <img src="https://img.shields.io/badge/City-Surat-orange?style=for-the-badge" alt="Surat">
  <img src="https://img.shields.io/badge/Transport-BRTS-green?style=for-the-badge" alt="BRTS">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>

---

## 📖 About

**GoRutes** is a feature-rich, mobile-first Progressive Web App that simulates the Surat BRTS (Bus Rapid Transit System) digital ticketing experience. It allows users to plan trips, generate realistic QR-coded bus tickets, and explore the transit network — all from their browser.

> ⚠️ **Disclaimer**: This is a **simulator/demo project** and is NOT affiliated with the official Surat BRTS or Surat Municipal Corporation. It is built for educational and portfolio purposes only.

---

## ✨ Features

### 🎫 Digital Ticket Generation
- Generate realistic BRTS bus tickets with QR codes
- Live countdown timer for ticket validity (1 hr 30 min)
- Unique ticket reference numbers
- Fare calculation with 20% mobile booking discount

### 🗺️ Trip Planning
- Select source & destination from 40+ BRTS stops
- Smart route suggestions with fare estimation
- Quick swap source/destination
- Suman Pravas (day pass) generation

### 🗺️ Interactive Transit Map
- SVG-based network map of Surat BRTS routes
- Click-to-select stations on the map
- Animated route path visualization

### 📋 Booking Management
- View active passes with live countdown
- Booking history with expired ticket tracking
- Quick re-book from recent trips
- Print ticket support

### 🔔 Smart Alerts
- Real-time notifications for ticket expiry
- Service updates and announcements

### ⚙️ Customization
- 🌙 Dark Mode support
- ♾️ Infinite Timer mode (ticket never expires)
- 🇮🇳 Gujarati language toggle
- 👤 Editable user profile name

### 📱 PWA Features
- Install as a native app on mobile devices
- Works offline with Service Worker caching
- Responsive design optimized for mobile

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | App structure & semantic markup |
| **CSS3** | Custom styling with CSS variables, animations, glassmorphism |
| **Vanilla JavaScript** | App logic, state management, routing |
| **QRCode.js** | QR code generation for tickets |
| **Font Awesome 6** | Icons throughout the app |
| **Google Fonts (Inter)** | Modern typography |
| **Service Worker** | Offline caching & PWA support |
| **Web App Manifest** | PWA installability |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Edge, Firefox, Safari)
- No build tools or server required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blackhetnova/GoRuts.git
   cd GoRuts
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser, OR
   - Use a local server for full PWA features:
     ```bash
     # Using Python
     python -m http.server 8080

     # Using Node.js
     npx serve .

     # Using VS Code
     # Install "Live Server" extension and click "Go Live"
     ```

3. **Install as PWA** (optional)
   - Open the app in Chrome/Edge
   - Click the install icon in the address bar
   - The app will be added to your home screen

---

## 📂 Project Structure

```
GoRuts/
├── index.html              # Main app HTML with all pages
├── sw.js                   # Service Worker for offline caching
├── manifest.json           # PWA manifest configuration
├── css/
│   └── style.css           # Complete styling with CSS variables
├── js/
│   ├── data.js             # Static datasets (stops, routes, coordinates, translations)
│   ├── core.js             # Global state, init, localStorage, theme/lang, toast
│   ├── navigation.js       # Page router, side menu, login modal, drawer modals
│   ├── home.js             # Home screen: stop search, fare calc, quick rebook
│   ├── checkout.js         # Checkout: payment gateway, Suman Pravas, order summary
│   ├── ticket.js           # Ticket screen: QR gen, countdown timer, simulator
│   ├── booking.js          # Booking history: tabs, list render, clear/reset
│   ├── notifications.js    # Notifications feed, search bar route lookup
│   ├── map.js              # Transit map: SVG, Leaflet, Google Maps, geolocation
│   └── pwa.js              # PWA install prompt & service worker registration
├── assets/                 # Images, banners, and app icons
└── README.md               # This file
```

---

## 📸 Screenshots

| Home Screen | Digital Ticket | Transit Map |
|:-----------:|:--------------:|:-----------:|
| Plan your trip with source/destination selection | QR-coded ticket with live countdown | Interactive SVG network map |

---

## 🎯 Key Highlights

- **No frameworks** — Pure vanilla HTML, CSS & JavaScript
- **No build step** — Open and run instantly
- **Mobile-first** — Designed for smartphone screens
- **Offline capable** — Works without internet after first load
- **Realistic simulation** — Mirrors actual BRTS ticketing UX

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Made with ❤️ for Surat City

---

## ⭐ Show Your Support

If you found this project useful, please consider giving it a ⭐ on GitHub!
