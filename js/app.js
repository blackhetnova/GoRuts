// Global App States
let currentPage = 'home';
let pageHistory = [];
let selectedFrom = null;
let selectedTo = null;
let searchDirection = 'from'; // 'from' or 'to'
let bookingHistory = [];
let currentTicket = null;
let qrcodeInstance = null;
let qrcodeInstanceBig = null;
let countdownTimer = null;
let activeHistoryTab = 'active';

// User Configs & Simulator preferences
let userPreferences = {
  theme: 'light',
  userName: 'Panth',
  location: 'Surat, Gujarat',
  infiniteTimer: false,
  language: 'en'
};

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  loadUserData();
  renderHistoryList();
  renderNotifications();
  setupInitialStops();
  quickRebookList();
  
  // Theme apply
  document.body.setAttribute('data-theme', userPreferences.theme);
  const themeToggle = document.getElementById('darkModeToggle');
  if (themeToggle && userPreferences.theme === 'dark') {
    themeToggle.classList.add('checked');
  }

  // Set default datetime value in ticket config (if element exists)
  const customTimeInput = document.getElementById('simCustomDateTime');
  if (customTimeInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    customTimeInput.value = now.toISOString().slice(0, 16);
  }

  // Set initial browser history state for mobile hardware/gesture back button support
  try {
    if (window.history) {
      window.history.replaceState({ page: 'home' }, '', '#home');
    }
  } catch(e) {}

  // Handle hardware / gesture back button on Android & iOS mobile devices
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
      navigateTo(event.state.page, false);
    } else {
      // Prevent exiting the app, navigate back to home screen
      navigateTo('home', false);
    }
  });
});

// Load preferences and bookings from localstorage
function loadUserData() {
  try {
    const savedPrefs = localStorage.getItem('gorutes_prefs');
    if (savedPrefs) {
      userPreferences = JSON.parse(savedPrefs);
      document.getElementById('userDisplayName').textContent = userPreferences.userName;
      document.getElementById('userDisplayLoc').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${userPreferences.location}`;
      
      // Set interface switches
      if (userPreferences.infiniteTimer) document.getElementById('infiniteTimerToggle').classList.add('checked');
      if (userPreferences.language === 'gu') document.getElementById('langToggle').classList.add('checked');
    }
  } catch (e) {
    console.error("Failed to parse preferences from localStorage:", e);
  }
  
  try {
    const savedHistory = localStorage.getItem('gorutes_history');
    if (savedHistory) {
      bookingHistory = JSON.parse(savedHistory);
    }
  } catch (e) {
    console.error("Failed to parse booking history from localStorage:", e);
    bookingHistory = [];
  }
}

// Save preferences to storage
function savePreferences() {
  try {
    localStorage.setItem('gorutes_prefs', JSON.stringify(userPreferences));
  } catch (e) {
    console.error("Failed to save preferences to localStorage:", e);
  }
}

// Navigation Router
function navigateTo(pageId, pushToBrowserHistory = true) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show target page
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;
  }
  
  // Highlight active bottom navigation button
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => btn.classList.remove('active'));
  const activeNavBtn = document.getElementById('nav-btn-' + pageId);
  if (activeNavBtn) {
    activeNavBtn.classList.add('active');
  }

  // Push browser history state for mobile hardware/gesture back button support
  if (pushToBrowserHistory && window.history) {
    try {
      if (!window.history.state || window.history.state.page !== pageId) {
        window.history.pushState({ page: pageId }, '', '#' + pageId);
      }
    } catch(e) {
      console.warn("History push state notice:", e);
    }
  }
  
  // Page specific render triggers
  if (pageId === 'booking') {
    renderHistoryList();
  } else if (pageId === 'notifications') {
    renderNotifications();
  } else if (pageId === 'map') {
    updateMapHighlight();
    initLeafletMap();
  } else if (pageId === 'home') {
    quickRebookList();
  }
  
  // Clear routing stack if we navigate to root tabs
  if (['home', 'booking', 'map', 'notifications'].includes(pageId)) {
    pageHistory = [];
  }
}

function goBack() {
  if (pageHistory.length > 0) {
    const prevPage = pageHistory.pop();
    navigateTo(prevPage, false);
  } else {
    // Return to home screen instead of exiting app
    navigateTo('home', false);
  }
}

function pushHistory(pageId) {
  if (currentPage !== pageId && !pageHistory.includes(currentPage)) {
    pageHistory.push(currentPage);
  }
}

// Side Menu Toggles
function toggleMenu(show) {
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  if (show) {
    sideMenu.classList.add('open');
    overlay.classList.add('open');
  } else {
    sideMenu.classList.remove('open');
    overlay.classList.remove('open');
  }
}

// Edit Profile & Login Modal Settings
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  const input = document.getElementById('loginNameInput');
  if (input) input.value = userPreferences.userName || 'Panth';
  if (modal) modal.classList.add('open');
}

// Close Login Modal
function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('open');
}

// Save Login User
function saveLoginUser() {
  const input = document.getElementById('loginNameInput');
  if (input && input.value.trim() !== '') {
    userPreferences.userName = input.value.trim();
    savePreferences();
    updateUserNameDisplay();
    closeLoginModal();
    showToast("Profile name updated: " + userPreferences.userName);
  }
}

function updateUserNameDisplay() {
  const display = document.getElementById('userDisplayName');
  if (display) display.textContent = userPreferences.userName || 'Panth';
}

function editProfileName() {
  openLoginModal();
}

function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: 'Surat BRTS Digital Transit Pass',
      text: 'Book digital BRTS bus tickets instantly with GoRutes!',
      url: window.location.href
    }).catch(console.error);
  } else {
    navigator.clipboard?.writeText(window.location.href);
    showToast("App link copied to clipboard!");
  }
}

function deleteAccount() {
  if (confirm("Are you sure you want to reset your profile name to default?")) {
    userPreferences.userName = "Panth";
    savePreferences();
    updateUserNameDisplay();
    toggleMenu(false);
    showToast("Profile reset to Panth");
  }
}

function logoutUser() {
  toggleMenu(false);
  openLoginModal();
}

// Interactive Modal Handlers for Drawer Buttons
function openFavouritesModal() { document.getElementById('favouritesModal')?.classList.add('open'); }
function closeFavouritesModal() { document.getElementById('favouritesModal')?.classList.remove('open'); }

function openComplaintModal() { document.getElementById('complaintModal')?.classList.add('open'); }
function closeComplaintModal() { document.getElementById('complaintModal')?.classList.remove('open'); }
function submitComplaint() {
  const text = document.getElementById('complaintText')?.value;
  if (!text || text.trim() === '') {
    showToast("Please enter grievance details!");
    return;
  }
  const refNo = "SMC-GRIEV-" + Math.floor(100000 + Math.random() * 900000);
  closeComplaintModal();
  showToast("✅ Grievance Registered! Ref: " + refNo);
}

function openFeedbackModal() { document.getElementById('feedbackModal')?.classList.add('open'); }
function closeFeedbackModal() { document.getElementById('feedbackModal')?.classList.remove('open'); }
function setStarRating(stars) {
  const row = document.getElementById('starRatingRow');
  if (row) {
    const iconList = row.querySelectorAll('i');
    iconList.forEach((icon, idx) => {
      if (idx < stars) {
        icon.className = 'fas fa-star';
      } else {
        icon.className = 'far fa-star';
      }
    });
  }
  showToast("Rated " + stars + " Stars!");
}
function submitFeedback() {
  closeFeedbackModal();
  showToast("🎉 Thank you for your valuable feedback!");
}

function openContactModal() { document.getElementById('contactModal')?.classList.add('open'); }
function closeContactModal() { document.getElementById('contactModal')?.classList.remove('open'); }

function openTermsModal() { document.getElementById('termsModal')?.classList.add('open'); }
function closeTermsModal() { document.getElementById('termsModal')?.classList.remove('open'); }

function openPrivacyModal() { document.getElementById('privacyModal')?.classList.add('open'); }
function closePrivacyModal() { document.getElementById('privacyModal')?.classList.remove('open'); }

// Dark Mode Toggle
function toggleDarkMode() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  document.body.setAttribute('data-theme', nextTheme);
  
  userPreferences.theme = nextTheme;
  savePreferences();
  
  const toggleBtn = document.getElementById('darkModeToggle');
  if (nextTheme === 'dark') {
    toggleBtn.classList.add('checked');
  } else {
    toggleBtn.classList.remove('checked');
  }
  showToast(nextTheme === 'dark' ? "Dark Theme enabled" : "Light Theme enabled");
}

// Infinite countdown timer switch
function toggleInfiniteTimer() {
  userPreferences.infiniteTimer = !userPreferences.infiniteTimer;
  savePreferences();
  
  const toggleBtn = document.getElementById('infiniteTimerToggle');
  if (userPreferences.infiniteTimer) {
    toggleBtn.classList.add('checked');
    showToast("Infinite Timer activated");
  } else {
    toggleBtn.classList.remove('checked');
    showToast("Realistic timer enabled");
  }
  
  // If viewing ticket, reset timer calculation
  if (currentTicket) {
    startTicketTimer(currentTicket);
  }
}

// Language translation toggle
function toggleLanguage() {
  userPreferences.language = userPreferences.language === 'en' ? 'gu' : 'en';
  savePreferences();
  
  const toggleBtn = document.getElementById('langToggle');
  if (userPreferences.language === 'gu') {
    toggleBtn.classList.add('checked');
    showToast("ગુજરાતી ભાષા સક્રિય");
  } else {
    toggleBtn.classList.remove('checked');
    showToast("English Language active");
  }
  
  // Re-translate inputs on home screen
  updateLanguageUI();
}

function updateLanguageUI() {
  const lang = userPreferences.language;
  const labels = langText[lang];
  
  // Home page planner translations
  const labelFrom = document.querySelector('#page-home .planner-input-box:nth-child(1) .planner-label');
  const labelTo = document.querySelector('#page-home .planner-input-box:nth-child(3) .planner-label');
  if (labelFrom) labelFrom.textContent = labels.fromLabel;
  if (labelTo) labelTo.textContent = labels.toLabel;
  
  if (!selectedFrom) document.getElementById('fromStopLabel').textContent = labels.selectSrc;
  if (!selectedTo) document.getElementById('toStopLabel').textContent = labels.selectDst;
  
  // Translate active ticket details if open
  if (currentTicket) {
    translateTicketContent(currentTicket);
  }
}

// Show interactive toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Initialize default source & destination stops
function setupInitialStops() {
  selectedFrom = null;
  selectedTo = null;
  
  const fromLabel = document.getElementById('fromStopLabel');
  const toLabel = document.getElementById('toStopLabel');
  
  if (fromLabel) {
    fromLabel.textContent = "Select Source";
    fromLabel.classList.remove('selected');
  }
  if (toLabel) {
    toLabel.textContent = "Select Destination";
    toLabel.classList.remove('selected');
  }
}

// Open Stop selector list screen
function openStopSearch(direction) {
  searchDirection = direction;
  pushHistory(currentPage);
  
  // Set title
  const searchTitle = document.getElementById('searchPageTitle');
  searchTitle.textContent = direction === 'from' ? "Select Source Stop" : "Select Destination Stop";
  
  navigateTo('search-stop');
  
  document.getElementById('stopSearchInput').value = '';
  document.getElementById('stopSearchInput').focus();
  renderStopsList(busStops);
}

// Dynamic stops listing
function renderStopsList(stops) {
  const container = document.getElementById('stopsList');
  if (stops.length === 0) {
    container.innerHTML = `<div style="padding:24px; text-align:center; color:var(--text-secondary)">No stops match search query</div>`;
    return;
  }
  
  container.innerHTML = stops.map(stop => {
    const isAirport = stop.toLowerCase().includes('airport');
    const isRailway = stop.toLowerCase().includes('railway');
    const icon = isAirport ? 'fa-plane-departure' : (isRailway ? 'fa-train' : 'fa-bus-alt');
    
    return `
      <div class="stop-item" onclick="selectStopItem('${stop.replace(/'/g, "\\'")}')">
        <i class="fas ${icon}"></i>
        <span>${stop}</span>
      </div>
    `;
  }).join('');
}

// Filter stops by query matching
function filterSearchStops() {
  const query = document.getElementById('stopSearchInput').value.toLowerCase().trim();
  if (query === '') {
    renderStopsList(busStops);
    return;
  }
  
  const filtered = busStops.filter(stop => stop.toLowerCase().includes(query));
  renderStopsList(filtered);
}

// Save stop select details
function selectStopItem(stopName) {
  if (searchDirection === 'from') {
    selectedFrom = stopName;
    document.getElementById('fromStopLabel').textContent = stopName;
  } else {
    selectedTo = stopName;
    document.getElementById('toStopLabel').textContent = stopName;
  }
  
  goBack();
  showToast(`Selected: ${stopName.replace(" BRTS", "")}`);
}

// Swap from/to values
function swapStops() {
  const temp = selectedFrom;
  selectedFrom = selectedTo;
  selectedTo = temp;
  
  const labels = langText[userPreferences.language];
  document.getElementById('fromStopLabel').textContent = selectedFrom || labels.selectSrc;
  document.getElementById('toStopLabel').textContent = selectedTo || labels.selectDst;
  
  showToast("Stops swapped!");
}

// Calculate routes common between two stops
function getCommonRoutes(stop1, stop2) {
  const r1 = routeMap[stop1] || [];
  const r2 = routeMap[stop2] || [];
  const common = r1.filter(r => r2.includes(r));
  return common.length > 0 ? common : ["12U", "17AU"];
}

// Calculate ticketing fare based on index distance
function calculateFare(from, to) {
  const fromIdx = busStops.indexOf(from);
  const toIdx = busStops.indexOf(to);
  if (fromIdx === -1 || toIdx === -1) return { totalFare: 10, discount: 2, netPayable: 8 };
  
  const distance = Math.abs(toIdx - fromIdx);
  let totalFare = 10;
  if (distance > 5) totalFare = 15;
  if (distance > 10) totalFare = 20;
  if (distance > 15) totalFare = 25;
  if (distance > 20) totalFare = 30;
  if (distance > 30) totalFare = 37;
  
  const discount = Math.round(totalFare * 0.2 * 10) / 10;
  const netPayable = totalFare - discount;
  
  return { totalFare, discount, netPayable };
}

// Trim BRTS suffix for ticket displays
function getShortStopName(stopName) {
  if (!stopName) return "Select Station";
  return stopName.replace(/ BRTS$/i, "").replace(/\s+/g, " ").trim();
}

// Generate unique ticket numbers (GoRutes standard)
function generateTicketNumber() {
  return "7101" + Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

// Quick booking list render
function quickRebookList() {
  const container = document.getElementById('quickRebookList');
  if (bookingHistory.length === 0) {
    container.innerHTML = `<div style="text-align:center; font-size:12px; color:var(--text-secondary); padding:10px 0;">No recent bookings found. Generate your first ticket!</div>`;
    return;
  }
  
  // Show up to 3 latest unique routes
  const shown = [];
  const uniqueBookings = bookingHistory.filter(ticket => {
    const routeKey = ticket.isSumanPravas ? 'suman' : `${ticket.fromStop}-${ticket.toStop}`;
    if (shown.includes(routeKey)) return false;
    shown.push(routeKey);
    return true;
  }).slice(0, 3);
  
  container.innerHTML = uniqueBookings.map(ticket => {
    if (ticket.isSumanPravas) {
      return `
        <div class="recent-booking-card" onclick="rebookSumanPravas()">
          <div class="recent-info">
            <div class="recent-route"><i class="fas fa-award" style="color:var(--primary)"></i> Suman Pravas Pass</div>
            <div class="recent-date">Unlimited Travel Pass - Rs 30</div>
          </div>
          <i class="fas fa-chevron-right" style="color:var(--text-secondary); font-size:12px"></i>
        </div>
      `;
    }
    
    const fromShort = getShortStopName(ticket.fromStop);
    const toShort = getShortStopName(ticket.toStop);
    
    return `
      <div class="recent-booking-card" onclick="rebookRoute('${ticket.fromStop.replace(/'/g, "\\'")}', '${ticket.toStop.replace(/'/g, "\\'")}')">
        <div class="recent-info">
          <div class="recent-route">
            <span>${fromShort}</span>
            <i class="fas fa-arrow-right" style="font-size:10px; color:var(--primary)"></i>
            <span>${toShort}</span>
          </div>
          <div class="recent-date">Fare: Rs ${ticket.netPayable.toFixed(1)} | Routes: ${ticket.routes.join(', ')}</div>
        </div>
        <i class="fas fa-chevron-right" style="color:var(--text-secondary); font-size:12px"></i>
      </div>
    `;
  }).join('');
}

// Click handlers for quick bookings
function rebookRoute(from, to) {
  selectedFrom = from;
  selectedTo = to;
  document.getElementById('fromStopLabel').textContent = from;
  document.getElementById('toStopLabel').textContent = to;
  proceedToPayment();
}

function rebookSumanPravas() {
  generateSumanPravas();
}

let pendingTicket = null;
let selectedPaymentMethodType = 'upi';

// Process booking to open payment gateway checkout screen
function proceedToPayment() {
  if (!selectedFrom || !selectedTo) {
    showToast("Please choose both source & destination stops!");
    return;
  }
  if (selectedFrom === selectedTo) {
    showToast("Source and destination cannot be the same!");
    return;
  }
  
  const fare = calculateFare(selectedFrom, selectedTo);
  const routes = getCommonRoutes(selectedFrom, selectedTo);
  const ticketNum = generateTicketNumber();
  const timestamp = Date.now();
  
  pendingTicket = {
    id: 'ticket_' + timestamp,
    ticketNo: ticketNum,
    refNo: ticketNum.substring(4, 16),
    fromStop: selectedFrom,
    toStop: selectedTo,
    isSumanPravas: false,
    routes: routes,
    baseFare: fare.totalFare,
    discount: fare.discount,
    netPayable: fare.netPayable,
    quantity: 1,
    paxCategory: "Adult (General)",
    purchaseTime: timestamp,
    expiryTime: timestamp + (1.5 * 60 * 60 * 1000), // 1.5 hr validity
    status: 'valid'
  };
  
  openCheckoutPage(pendingTicket);
}

// Generate Suman Pravas daily pass
function generateSumanPravas() {
  const ticketNum = generateTicketNumber();
  const timestamp = Date.now();
  const expiryTime = getSumanExpiryTimeFor(timestamp);
  
  pendingTicket = {
    id: 'ticket_' + timestamp,
    ticketNo: ticketNum,
    refNo: ticketNum.substring(4, 16),
    fromStop: "All Surat BRTS Routes",
    toStop: "Unlimited Rides",
    isSumanPravas: true,
    routes: ["All Routes"],
    baseFare: 30.0,
    discount: 0.0,
    netPayable: 30.0,
    quantity: 1,
    paxCategory: "Adult (Unlimited)",
    purchaseTime: timestamp,
    expiryTime: expiryTime,
    status: 'valid'
  };
  
  openCheckoutPage(pendingTicket);
}

// Render checkout order summary & QR code for payment
function openCheckoutPage(ticket) {
  const fromShort = getShortStopName(ticket.fromStop);
  const toShort = getShortStopName(ticket.toStop);
  
  document.getElementById('checkoutRouteTitle').innerHTML = `${fromShort} <i class="fas fa-arrow-right" style="font-size:12px"></i> ${toShort}`;
  document.getElementById('checkoutAmount').textContent = `Rs ${ticket.netPayable.toFixed(1)}`;
  document.getElementById('payNowAmountBtn').textContent = `Rs ${ticket.netPayable.toFixed(1)}`;
  
  // Render payment QR code
  const upiQrContainer = document.getElementById('checkoutUPIQR');
  if (upiQrContainer) {
    upiQrContainer.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      const upiPayload = `upi://pay?pa=smc.sitilink@bank&pn=Surat%20BRTS&am=${ticket.netPayable.toFixed(1)}&cu=INR&tn=BRTS%20Pass%20${ticket.ticketNo}`;
      new QRCode(upiQrContainer, {
        text: upiPayload,
        width: 140,
        height: 140,
        colorDark: "#1e5aa8",
        colorLight: "#ffffff"
      });
    }
  }

  pushHistory('home');
  navigateTo('checkout');
}

// Select payment method radio & show details box
function selectPaymentMethod(method) {
  selectedPaymentMethodType = method;
  const methods = ['upi', 'card', 'netbanking'];
  
  methods.forEach(m => {
    const box = document.getElementById(m === 'netbanking' ? 'netbankPayBox' : m + 'PayBox');
    const item = document.getElementById('payItem' + (m === 'upi' ? 'UPI' : m.charAt(0).toUpperCase() + m.slice(1)));
    const radio = document.getElementById('pay' + (m === 'upi' ? 'UPI' : m.charAt(0).toUpperCase() + m.slice(1)));
    
    if (box) box.style.display = (m === method) ? 'block' : 'none';
    if (item) {
      if (m === method) {
        item.style.borderColor = 'var(--primary)';
        item.style.borderWidth = '2px';
      } else {
        item.style.borderColor = 'var(--border)';
        item.style.borderWidth = '1px';
      }
    }
    if (radio) radio.checked = (m === method);
  });
}

// Confirm Payment & Generate Digital Pass
function confirmAndPay() {
  if (!pendingTicket) return;
  
  const payBtn = document.getElementById('payNowBtn');
  const originalHtml = payBtn.innerHTML;
  
  // Show processing animation
  payBtn.disabled = true;
  payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
  
  setTimeout(() => {
    payBtn.disabled = false;
    payBtn.innerHTML = originalHtml;
    
    // Save pending ticket to history
    bookingHistory.unshift(pendingTicket);
    saveHistoryToStorage();
    currentTicket = pendingTicket;
    
    navigateTo('payment-details');
    renderTicketDetails(pendingTicket);
    showToast("🎉 Payment Successful! Ticket Generated.");
    pendingTicket = null;
  }, 1200);
}

// Render dynamic elements of the ticket
function renderTicketDetails(ticket) {
  // Save dynamic variables reference
  const fromShort = getShortStopName(ticket.fromStop).toUpperCase();
  const toShort = getShortStopName(ticket.toStop).toUpperCase();
  
  // Set date values (dd/mm/yy & hh:mm:ss)
  const dateObj = new Date(ticket.purchaseTime);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getFullYear()).slice(-2);
  const dateStr = `${day}/${month}/${year}`;
  
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const mins = String(dateObj.getMinutes()).padStart(2, '0');
  const secs = String(dateObj.getSeconds()).padStart(2, '0');
  const timeStr = `${hours}:${mins}:${secs}`;
  
  // Update fields
  document.getElementById('displayTicketNo').textContent = ticket.ticketNo;
  document.getElementById('displayRefNo').textContent = ticket.refNo || ticket.ticketNo;
  document.getElementById('displayTransDate').textContent = dateStr;
  document.getElementById('displayTransTime').textContent = timeStr;
  
  // Multiplier fare displays with Rupee symbol
  const totalBase = (ticket.baseFare * ticket.quantity);
  const totalDisc = (ticket.discount * ticket.quantity);
  const netPay = (ticket.netPayable * ticket.quantity);
  
  document.getElementById('displayBaseFare').textContent = `₹ ${totalBase.toFixed(1)}`;
  document.getElementById('displayDiscount').textContent = `₹ ${totalDisc.toFixed(1)}`;
  document.getElementById('displayFareAmount').textContent = `₹ ${netPay.toFixed(1)}`;
  document.getElementById('displayNetPayable').textContent = `₹ ${netPay.toFixed(1)}`;
  
  // Passenger qty values
  document.getElementById('displayPassengerQtyVal').textContent = ticket.quantity;
  document.getElementById('displayPassengerTotalVal').textContent = ticket.quantity;
  
  // Route title formatted uppercase
  document.getElementById('displayRouteTitle').innerHTML = `${fromShort} <i class="fas fa-long-arrow-alt-right" style="margin:0 4px; color:#555"></i> ${toShort}`;
  document.getElementById('displayRouteCodes').innerHTML = `<i class="fas fa-bus" style="font-size:12px; margin-right:4px;"></i> ${ticket.routes.join(', ')}`;
  
  // Generate QRs
  generateTicketQR(ticket);
  
  // Start countdown clock
  startTicketTimer(ticket);
}

// Generate client QR codes using qrcodejs
function generateTicketQR(ticket) {
  let qrPayload = "";
  const fromShort = getShortStopName(ticket.fromStop).replace(/\s/g, "_");
  const toShort = getShortStopName(ticket.toStop).replace(/\s/g, "_");
  
  if (ticket.isSumanPravas) {
    qrPayload = `GoRutes:SUMAN_PRAVAS:${ticket.ticketNo}:ADULT:UNLIMITED:Rs${(ticket.netPayable * ticket.quantity).toFixed(1)}`;
  } else {
    qrPayload = `GoRutes:${ticket.ticketNo}:${fromShort}:${toShort}:ADULT:${ticket.quantity}:Rs${(ticket.netPayable * ticket.quantity).toFixed(1)}`;
  }
  
  // Container cleanups
  document.getElementById('qrcode').innerHTML = '';
  document.getElementById('qrcodeBig').innerHTML = '';
  
  // Render small QR
  qrcodeInstance = new QRCode(document.getElementById('qrcode'), {
    text: qrPayload,
    width: 140,
    height: 140,
    colorDark: "#111111",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });
  
  // Render big modal QR
  qrcodeInstanceBig = new QRCode(document.getElementById('qrcodeBig'), {
    text: qrPayload,
    width: 240,
    height: 240,
    colorDark: "#111111",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  
  document.getElementById('expandedTicketNo').textContent = ticket.ticketNo;
}

// Handle ticket validation and expirations ticking
function startTicketTimer(ticket) {
  if (countdownTimer) clearInterval(countdownTimer);
  
  const timerDisplay = document.getElementById('displayCountdown');
  
  function tick() {
    const now = Date.now();
    
    // Check if force expired simulation
    if (ticket.status === 'expired') {
      clearInterval(countdownTimer);
      timerDisplay.textContent = 'EXPIRED';
      timerDisplay.className = 'ticket-timer-display expired';
      return;
    }
    
    // Infinite simulator mode overrides expiry check
    if (userPreferences.infiniteTimer) {
      timerDisplay.textContent = '01:29:45';
      timerDisplay.className = 'ticket-timer-display';
      return;
    }
    
    const diff = ticket.expiryTime - now;
    
    if (diff <= 0) {
      clearInterval(countdownTimer);
      ticket.status = 'expired';
      saveHistoryToStorage();
      
      timerDisplay.textContent = 'EXPIRED';
      timerDisplay.className = 'ticket-timer-display expired';
      
      // Update header validation status to expired
      translateTicketContent(ticket);
      return;
    }
    
    // Format timer
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    const hStr = hours < 10 ? '0' + hours : hours;
    const mStr = mins < 10 ? '0' + mins : mins;
    const sStr = secs < 10 ? '0' + secs : secs;
    
    timerDisplay.textContent = `${hStr} : ${mStr} : ${sStr}`;
    timerDisplay.className = 'ticket-timer-display';
  }
  
  tick();
  countdownTimer = setInterval(tick, 1000);
}

// Save list array state back to storage
function saveHistoryToStorage() {
  try {
    localStorage.setItem('gorutes_history', JSON.stringify(bookingHistory));
  } catch (e) {
    console.error("Failed to save booking history to localStorage:", e);
  }
}

// Expanded QR Modal toggle
function openFullQR() {
  if (currentTicket && currentTicket.status !== 'expired') {
    document.getElementById('qrModal').classList.add('show');
    
    // Set simulated scan check state
    const gateStatus = document.getElementById('gateScanStatus');
    if (currentTicket.status === 'scanned') {
      gateStatus.innerHTML = `<i class="fas fa-check-double"></i> Scan Successful! Entry Authorized.`;
      gateStatus.style.color = "var(--success)";
    } else {
      gateStatus.innerHTML = `<i class="fas fa-sync fa-spin"></i> Awaiting Gate Scan...`;
      gateStatus.style.color = "var(--warning)";
    }
  } else {
    showToast("Expired ticket QR cannot be expanded");
  }
}

function closeFullQR() {
  document.getElementById('qrModal').classList.remove('show');
}

// Simulator customizations adjustments
function adjustPaxQty() {
  if (!currentTicket) return;
  const qty = parseInt(document.getElementById('simPaxQty').value);
  currentTicket.quantity = qty;
  
  // Re-save & re-render
  saveHistoryToStorage();
  renderTicketDetails(currentTicket);
  showToast(`Quantity adjusted to ${qty} Adult passenger${qty > 1 ? 's' : ''}`);
}

function adjustSimTimestamp() {
  const mode = document.getElementById('simDateAdjust').value;
  const customGroup = document.getElementById('simCustomTimeGroup');
  
  if (mode === 'custom') {
    customGroup.style.display = "block";
  } else {
    customGroup.style.display = "none";
    
    if (!currentTicket) return;
    const now = Date.now();
    if (mode === 'current') {
      currentTicket.purchaseTime = now;
      currentTicket.expiryTime = currentTicket.isSumanPravas ? getSumanExpiryTimeFor(now) : now + (1.5 * 60 * 60 * 1000);
      currentTicket.status = 'valid';
    } else if (mode === 'yesterday') {
      const yesterday = now - (24 * 60 * 60 * 1000);
      currentTicket.purchaseTime = yesterday;
      currentTicket.expiryTime = currentTicket.isSumanPravas ? getSumanExpiryTimeFor(yesterday) : yesterday + (1.5 * 60 * 60 * 1000);
      currentTicket.status = 'expired';
    }
    
    saveHistoryToStorage();
    renderTicketDetails(currentTicket);
  }
}

function applyCustomTimestamp() {
  if (!currentTicket) return;
  const val = document.getElementById('simCustomDateTime').value;
  if (!val) return;
  
  const customDate = new Date(val);
  const timeMs = customDate.getTime();
  
  currentTicket.purchaseTime = timeMs;
  currentTicket.expiryTime = currentTicket.isSumanPravas ? getSumanExpiryTimeFor(timeMs) : timeMs + (1.5 * 60 * 60 * 1000);
  
  // Check if target is in the past
  if (Date.now() > currentTicket.expiryTime) {
    currentTicket.status = 'expired';
  } else {
    currentTicket.status = 'valid';
  }
  
  saveHistoryToStorage();
  renderTicketDetails(currentTicket);
  showToast("Custom ticket timestamp applied!");
}

function getSumanExpiryTimeFor(timestamp) {
  const expiry = new Date(timestamp);
  expiry.setHours(22, 0, 0, 0);
  if (timestamp > expiry.getTime()) {
    expiry.setDate(expiry.getDate() + 1);
  }
  return expiry.getTime();
}

// Simulator commands actions
function simulateSelfValidate() {
  if (!currentTicket) return;
  if (currentTicket.status === 'expired') {
    showToast("Cannot validate an expired ticket!");
    return;
  }
  
  currentTicket.status = 'scanned';
  saveHistoryToStorage();
  
  // Render ticket updates
  translateTicketContent(currentTicket);
  
  // Sound effect simulation
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    osc.start();
    osc.stop(audioContext.currentTime + 0.15); // short beep
    
    setTimeout(() => {
      // Second pitch beep
      const osc2 = audioContext.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1100, audioContext.currentTime); // C#6 note
      osc2.connect(gain);
      osc2.start();
      osc2.stop(audioContext.currentTime + 0.25);
    }, 150);
  } catch (e) {
    console.log("Audio validation chime error", e);
  }
  
  // If QR modal is open, trigger UI feedback scan success
  const gateStatus = document.getElementById('gateScanStatus');
  if (gateStatus) {
    gateStatus.innerHTML = `<i class="fas fa-check-double"></i> Scan Successful! Entry Authorized.`;
    gateStatus.style.color = "var(--success)";
    
    setTimeout(() => {
      closeFullQR();
    }, 1500);
  }
  
  showToast("Gate validation scan successful!");
}

function simulateExpireTicket() {
  if (!currentTicket) return;
  currentTicket.status = 'expired';
  saveHistoryToStorage();
  
  renderTicketDetails(currentTicket);
  showToast("Ticket forced to Expired state");
}

// My Bookings history rendering logic
function toggleBookingTabs(tab) {
  activeHistoryTab = tab;
  document.getElementById('tabActiveBtn').className = tab === 'active' ? 'tab-btn active' : 'tab-btn';
  document.getElementById('tabHistoryBtn').className = tab === 'history' ? 'tab-btn active' : 'tab-btn';
  renderHistoryList();
}

function renderHistoryList() {
  const container = document.getElementById('bookingsListArea');
  if (bookingHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:60px 24px; color:var(--text-secondary)">
        <i class="fas fa-ticket-alt" style="font-size:48px; color:var(--border); margin-bottom:16px"></i>
        <h3 style="font-size:16px; font-weight:700; margin-bottom:8px; color:var(--text)">No Active Passes found</h3>
        <p style="font-size:12px; margin-bottom:20px">Book new digital ticket or daily travel card online instantly.</p>
        <button class="btn-primary" onclick="navigateTo('home')" style="display:inline-flex; width:auto; padding:10px 24px">Book Now</button>
      </div>
    `;
    return;
  }
  
  // Filter tickets by current date or expiration state
  const now = Date.now();
  const filteredTickets = bookingHistory.filter(ticket => {
    // Re-verify expiration live status
    const isExpired = ticket.status === 'expired' || (!userPreferences.infiniteTimer && ticket.expiryTime <= now);
    return activeHistoryTab === 'active' ? !isExpired : isExpired;
  });
  
  if (filteredTickets.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:60px 24px; color:var(--text-secondary)">
        <i class="fas fa-folder-open" style="font-size:40px; color:var(--border); margin-bottom:16px"></i>
        <p style="font-size:13px">No tickets found in this category.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredTickets.map(ticket => {
    const isSuman = ticket.isSumanPravas;
    const dateObj = new Date(ticket.purchaseTime);
    const dateStr = dateObj.toLocaleDateString('en-GB');
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    const badgeText = isSuman ? 'Suman Pravas' : (ticket.status === 'scanned' ? 'Scanned' : 'Valid');
    const badgeClass = isSuman ? 'badge suman' : 'badge active';
    
    return `
      <div class="booking-history-card" onclick="openTicketFromHistory('${ticket.id}')">
        <div class="history-card-header">
          <span class="${activeHistoryTab === 'active' ? badgeClass : 'badge expired'}">
            ${activeHistoryTab === 'active' ? badgeText : 'Expired'}
          </span>
          <span style="font-size:11px; font-weight:600; color:var(--text-secondary)">Rs ${(ticket.netPayable * ticket.quantity).toFixed(1)}</span>
        </div>
        
        <div class="history-route">
          ${isSuman ? 'Suman Pravas Pass' : `${getShortStopName(ticket.fromStop)} <i class="fas fa-arrow-right" style="font-size:10px; color:var(--primary); margin:0 4px"></i> ${getShortStopName(ticket.toStop)}`}
        </div>
        
        <div class="history-details">
          <div><i class="far fa-clock"></i> ${timeStr} | ${dateStr}</div>
          <div style="text-align:right"><i class="fas fa-ticket-alt"></i> ${ticket.ticketNo.substring(12)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function openTicketFromHistory(ticketId) {
  const ticket = bookingHistory.find(t => t.id === ticketId);
  if (ticket) {
    currentTicket = ticket;
    pushHistory('booking');
    navigateTo('payment-details');
    renderTicketDetails(ticket);
  }
}

function clearHistory() {
  if (confirm("Are you sure you want to clear booking history logs?")) {
    bookingHistory = [];
    localStorage.setItem('gorutes_history', JSON.stringify([]));
    renderHistoryList();
    showToast("Booking history cleared");
  }
}

// Reset Simulator Preferences
function resetSimulatorData() {
  if (confirm("Reset application defaults and preferences?")) {
    localStorage.removeItem('gorutes_prefs');
    localStorage.removeItem('gorutes_history');
    userPreferences = {
      theme: 'light',
      userName: 'Guest User',
      location: 'Surat, Gujarat',
      infiniteTimer: false,
      language: 'en'
    };
    bookingHistory = [];
    selectedFrom = "Simada Junction BRTS";
    selectedTo = "Nana Varachha BRTS";
    
    document.body.setAttribute('data-theme', 'light');
    document.getElementById('darkModeToggle').classList.remove('checked');
    document.getElementById('infiniteTimerToggle').classList.remove('checked');
    document.getElementById('langToggle').classList.remove('checked');
    
    document.getElementById('userDisplayName').textContent = userPreferences.userName;
    document.getElementById('userDisplayLoc').innerHTML = `<i class="fas fa-map-marker-alt"></i> Surat, Gujarat`;
    
    document.getElementById('fromStopLabel').textContent = selectedFrom;
    document.getElementById('toStopLabel').textContent = selectedTo;
    
    toggleMenu(false);
    navigateTo('home');
    showToast("App data reset successful!");
  }
}

// Render dynamic notifications feed
function renderNotifications() {
  const container = document.getElementById('alertsListArea');
  container.innerHTML = notificationsFeed.map(item => `
    <div class="notification-item ${item.type === 'alert' ? 'alert' : ''}">
      <div class="notification-header">
        <span><i class="fas ${item.type === 'alert' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i> ${item.type.toUpperCase()}</span>
        <span>${item.time}</span>
      </div>
      <div class="notification-title">${item.title}</div>
      <div class="notification-body">${item.text}</div>
    </div>
  `).join('');
}

// Search bar input quick route codes search
function quickSearchRoute() {
  const query = document.getElementById('routeSearchInput').value.trim().toUpperCase();
  const resultsDiv = document.getElementById('routeSearchResults');
  
  if (query === "") {
    resultsDiv.style.display = "none";
    return;
  }
  
  // Find route maps containing code
  const matchedStops = [];
  for (const stopName in routeMap) {
    const hasRoute = routeMap[stopName].some(r => r.toUpperCase().includes(query));
    if (hasRoute && !matchedStops.includes(stopName)) {
      matchedStops.push(stopName);
    }
  }
  
  if (matchedStops.length === 0) {
    resultsDiv.innerHTML = `<div style="padding:10px; font-size:12px; color:var(--text-secondary); text-align:center">No route stops matched</div>`;
    resultsDiv.style.display = "block";
    return;
  }
  
  resultsDiv.innerHTML = matchedStops.slice(0, 5).map(stop => `
    <div style="padding:10px 14px; font-size:13px; font-weight:500; cursor:pointer; border-bottom:1px solid var(--border)" onclick="selectSearchedRouteStop('${stop.replace(/'/g, "\\'")}')">
      <i class="fas fa-bus-alt" style="color:var(--primary); margin-right:8px"></i> ${stop}
    </div>
  `).join('');
  resultsDiv.style.display = "block";
}

function selectSearchedRouteStop(stopName) {
  selectedFrom = stopName;
  document.getElementById('fromStopLabel').textContent = stopName;
  document.getElementById('routeSearchInput').value = "";
  document.getElementById('routeSearchResults').style.display = "none";
  showToast(`Source set to: ${stopName.replace(" BRTS", "")}`);
}

// Transit Map Page Node Click Select handlers
function selectMapStation(stationName) {
  if (!selectedFrom || (selectedFrom && selectedTo)) {
    // Reset selection sequence
    selectedFrom = stationName;
    selectedTo = null;
    document.getElementById('fromStopLabel').textContent = stationName;
    document.getElementById('toStopLabel').textContent = langText[userPreferences.language].selectDst;
    showToast(`Source set: ${stationName.replace(" BRTS", "")}`);
  } else {
    selectedTo = stationName;
    document.getElementById('toStopLabel').textContent = stationName;
    showToast(`Destination set: ${stationName.replace(" BRTS", "")}`);
    
    // Highlight connection line path in map
    updateMapHighlight();
    
    // Navigate home after delay
    setTimeout(() => {
      navigateTo('home');
    }, 1200);
  }
  
  // Re-scale/highlight station node
  updateMapHighlight();
}

// SVG Highlighting and animations
function updateMapHighlight() {
  const lineA = document.getElementById('lineA');
  const lineB = document.getElementById('lineB');
  const lineC = document.getElementById('lineC');
  const activeLine = document.getElementById('activeTripLine');
  const busIcon = document.getElementById('mapBusIcon');
  
  // Style resets
  lineA.style.stroke = "var(--border)";
  lineB.style.stroke = "var(--border)";
  lineC.style.stroke = "var(--border)";
  activeLine.setAttribute('d', '');
  busIcon.style.display = "none";
  
  // Reset nodes
  document.querySelectorAll('.map-station').forEach(node => {
    node.style.fill = "var(--card)";
    node.style.r = "5";
  });
  
  // Color the hubs
  const rStn = document.getElementById('station-Railway');
  if (rStn) rStn.style.fill = "var(--primary)";
  
  if (selectedFrom) {
    const fromNodeId = getMapNodeId(selectedFrom);
    const fromNode = document.getElementById(fromNodeId);
    if (fromNode) {
      fromNode.style.fill = "var(--secondary)";
      fromNode.style.r = "7";
    }
  }
  
  if (selectedTo) {
    const toNodeId = getMapNodeId(selectedTo);
    const toNode = document.getElementById(toNodeId);
    if (toNode) {
      toNode.style.fill = "var(--primary)";
      toNode.style.r = "7";
    }
  }
  
  if (selectedFrom && selectedTo) {
    // Find matching SVG line paths between stations
    const fromCoords = mapStationCoordinates[selectedFrom];
    const toCoords = mapStationCoordinates[selectedTo];
    
    if (fromCoords && toCoords) {
      // Connect coordinates
      const dPath = `M ${fromCoords.x} ${fromCoords.y} Q ${(fromCoords.x + toCoords.x)/2} ${(fromCoords.y + toCoords.y)/2} ${toCoords.x} ${toCoords.y}`;
      activeLine.setAttribute('d', dPath);
      
      // Animate simulated bus moving along path
      busIcon.style.display = "block";
      
      // Move SVG icon
      let percent = 0;
      const pathLength = activeLine.getTotalLength();
      
      if (pathLength > 0) {
        function moveBus() {
          if (percent > 100) percent = 0;
          const pt = activeLine.getPointAtLength((percent/100) * pathLength);
          busIcon.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
          percent += 0.8;
          if (currentPage === 'map') {
            requestAnimationFrame(moveBus);
          }
        }
        moveBus();
      }
    }
  }
}

// Convert station names to map SVG node IDs
function getMapNodeId(stationName) {
  if (stationName.includes("Jahangirpura")) return "station-Jahangirpura";
  if (stationName.includes("Sarthana")) return "station-Sarthana";
  if (stationName.includes("Sayan")) return "station-Sayan";
  if (stationName.includes("Adajan")) return "station-Adajan";
  if (stationName.includes("Katargam Darwaja")) return "station-KatarDarwaja";
  if (stationName.includes("Katargam")) return "station-Katargam";
  if (stationName.includes("Rander")) return "station-Rander";
  if (stationName.includes("Majura Gate")) return "station-MajuraGate";
  if (stationName.includes("Railway")) return "station-Railway";
  if (stationName.includes("Simada")) return "station-Simada";
  if (stationName.includes("Lal Darwaja")) return "station-LalDarwaja";
  if (stationName.includes("Varachha")) return "station-Varachha";
  if (stationName.includes("Athwa Gate")) return "station-AthwaGate";
  if (stationName.includes("Textile")) return "station-Textile";
  if (stationName.includes("Yogi Chowk")) return "station-YogiChowk";
  if (stationName.includes("Dumas")) return "station-Dumas";
  if (stationName.includes("Vesu")) return "station-Vesu";
  if (stationName.includes("Piplod")) return "station-Piplod";
  if (stationName.includes("City Center")) return "station-CityCenter";
  if (stationName.includes("Ring Road")) return "station-RingRoad";
  if (stationName.includes("VIP") || stationName.includes("V.I.P.")) return "station-VIPRoad";
  if (stationName.includes("Ghod Dod")) return "station-GhodDod";
  if (stationName.includes("Ved Road")) return "station-VedRoad";
  if (stationName.includes("Airport")) return "station-Airport";
  if (stationName.includes("Althan Depot")) return "station-AlthanDepot";
  if (stationName.includes("Althan")) return "station-Althan";
  if (stationName.includes("Udhana Darwaja")) return "station-UdhanaDarwaja";
  if (stationName.includes("Udhana")) return "station-Udhana";
  if (stationName.includes("Kosad")) return "station-Kosad";
  if (stationName.includes("Pandesara")) return "station-Pandesara";
  if (stationName.includes("Bhimrad")) return "station-Bhimrad";
  if (stationName.includes("Bhestan")) return "station-Bhestan";
  if (stationName.includes("Sachin Gam")) return "station-SachinGam";
  if (stationName.includes("Sachin")) return "station-Sachin";
  return "";
}

// Leaflet Real Map Instance & BRTS Routes Overlay
let leafletMapInstance = null;
let leafletMarkersGroup = null;
let leafletRoutesGroup = null;
let leafletTripPolyline = null;

function initLeafletMap() {
  const container = document.getElementById('leafletMap');
  if (!container || typeof L === 'undefined') return;

  if (!leafletMapInstance) {
    // Center map on Surat City [21.1702, 72.8311]
    leafletMapInstance = L.map('leafletMap').setView([21.1702, 72.8311], 12);

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors | Surat BRTS'
    }).addTo(leafletMapInstance);

    leafletRoutesGroup = L.layerGroup().addTo(leafletMapInstance);
    leafletMarkersGroup = L.layerGroup().addTo(leafletMapInstance);

    // Draw BRTS Corridors
    brtsCorridorsGeo.forEach(corridor => {
      L.polyline(corridor.points, {
        color: corridor.color,
        weight: 5,
        opacity: 0.8,
        lineCap: 'round'
      }).bindTooltip(corridor.name, { sticky: true }).addTo(leafletRoutesGroup);
    });

    // Add Bus Stop Markers
    Object.keys(stationGeoCoordinates).forEach(stName => {
      const coords = stationGeoCoordinates[stName];
      const isHub = stName.includes('Railway') || stName.includes('Lal Darwaja') || stName.includes('Textile');
      
      const marker = L.circleMarker(coords, {
        radius: isHub ? 8 : 6,
        fillColor: isHub ? '#e85d04' : '#1e5aa8',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      });

      const popupHtml = `
        <div style="text-align:center; padding: 4px;">
          <strong style="font-size:13px; color:#1e5aa8">${stName}</strong>
          <p style="font-size:10px; color:#666; margin:4px 0 8px 0;">Surat BRTS Bus Station</p>
          <div style="display:flex; gap:4px; justify-content:center;">
            <button style="background:#1e5aa8; color:white; border:none; padding:4px 8px; border-radius:4px; font-size:10px; cursor:pointer;" onclick="setStationFromMap('${stName}', 'from')">Set From</button>
            <button style="background:#e85d04; color:white; border:none; padding:4px 8px; border-radius:4px; font-size:10px; cursor:pointer;" onclick="setStationFromMap('${stName}', 'to')">Set To</button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml).addTo(leafletMarkersGroup);
    });
  }

  setTimeout(() => {
    leafletMapInstance.invalidateSize();
    updateLeafletTripRoute();
  }, 200);
}

function setStationFromMap(stName, type) {
  if (type === 'from') {
    selectedFrom = stName;
    document.getElementById('fromStopLabel').textContent = getShortStopName(stName);
    showToast(`From set to ${getShortStopName(stName)}`);
  } else {
    selectedTo = stName;
    document.getElementById('toStopLabel').textContent = getShortStopName(stName);
    showToast(`To set to ${getShortStopName(stName)}`);
  }
  updateLeafletTripRoute();
}

function updateLeafletTripRoute() {
  if (!leafletMapInstance) return;

  if (leafletTripPolyline) {
    leafletMapInstance.removeLayer(leafletTripPolyline);
    leafletTripPolyline = null;
  }

  if (selectedFrom && selectedTo && stationGeoCoordinates[selectedFrom] && stationGeoCoordinates[selectedTo]) {
    const p1 = stationGeoCoordinates[selectedFrom];
    const p2 = stationGeoCoordinates[selectedTo];

    leafletTripPolyline = L.polyline([p1, p2], {
      color: '#e85d04',
      weight: 6,
      opacity: 0.9,
      dashArray: '8, 8'
    }).addTo(leafletMapInstance);

    leafletMapInstance.fitBounds([p1, p2], { padding: [40, 40] });
  }
}

// Google Maps Navigation & View Switchers
function openInGoogleMaps() {
  let query = "Surat BRTS";
  if (selectedFrom && selectedTo) {
    query = `from ${selectedFrom} to ${selectedTo} Surat`;
  } else if (selectedFrom) {
    query = `${selectedFrom} Surat`;
  }
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(mapsUrl, '_blank');
}

function toggleMapSource() {
  const gContainer = document.getElementById('googleMapsContainer');
  const lContainer = document.getElementById('leafletMap');
  const label = document.getElementById('mapSourceLabel');
  
  if (gContainer.style.display === 'none') {
    gContainer.style.display = 'block';
    lContainer.style.display = 'none';
    if (label) label.innerHTML = '<i class="fas fa-satellite"></i> OpenStreetMap';
    showToast('Switched to Google Maps View');
  } else {
    gContainer.style.display = 'none';
    lContainer.style.display = 'block';
    if (label) label.innerHTML = '<i class="fas fa-satellite"></i> Google Maps';
    initLeafletMap();
    showToast('Switched to Interactive BRTS Routes Map');
  }
}

function switchMapViewMode(mode) {
  const modes = ['interactive', 'official', 'schematic'];
  modes.forEach(m => {
    const section = document.getElementById('mapView' + m.charAt(0).toUpperCase() + m.slice(1));
    const btn = document.getElementById('tabMap' + m.charAt(0).toUpperCase() + m.slice(1) + 'Btn');
    if (section) section.style.display = (m === mode) ? 'block' : 'none';
    if (btn) {
      if (m === mode) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  if (mode === 'interactive') {
    initLeafletMap();
    showToast('🗺️ Live Surat BRTS Routes Map');
  } else if (mode === 'official') {
    showToast('📜 Official Surat Route Map (SMC)');
  } else if (mode === 'schematic') {
    showToast('📊 Transit Line Schematic Map');
    updateMapHighlight();
  }
}

function locateUserOnMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      showToast(`📍 Your Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      if (leafletMapInstance) {
        leafletMapInstance.setView([latitude, longitude], 15);
        L.marker([latitude, longitude]).bindPopup('📍 You are here').addTo(leafletMapInstance).openPopup();
      }
    }, err => {
      showToast('📍 Showing Surat City Center');
    });
  } else {
    showToast('Geolocation not supported by your browser');
  }
}

// PWA Install Prompt Handler
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Show install banner
  const banner = document.getElementById('installBanner');
  if (banner && !localStorage.getItem('gorutes_install_dismissed')) {
    banner.style.display = 'block';
  }
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('🎉 GoRutes app installed successfully!');
      }
      deferredPrompt = null;
      document.getElementById('installBanner').style.display = 'none';
    });
  } else {
    // For iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isStandalone) {
      showToast('📱 Tap Share button → "Add to Home Screen"');
    } else if (isStandalone) {
      showToast('✅ App already installed!');
    } else {
      showToast('📱 Open in Chrome/Edge to install the app');
    }
  }
}

function dismissInstallBanner() {
  document.getElementById('installBanner').style.display = 'none';
  localStorage.setItem('gorutes_install_dismissed', 'true');
}

window.addEventListener('appinstalled', () => {
  showToast('🎉 GoRutes added to your home screen!');
  document.getElementById('installBanner').style.display = 'none';
  deferredPrompt = null;
});

// PWA Service worker installation
if ('serviceWorker' in navigator) {
  const registerSW = () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('GoRutes PWA registered successfully with scope:', reg.scope);
        // Check for updates periodically
        setInterval(() => reg.update(), 60 * 60 * 1000); // every hour
      }).catch(err => {
        console.log('SW registration error:', err);
      });
  };

  if (document.readyState === 'complete') {
    registerSW();
  } else {
    window.addEventListener('load', registerSW);
  }
}

// Translation logic for dynamic ticket display content
function translateTicketContent(ticket) {
  const lang = userPreferences.language;
  const labels = langText[lang];
  const validationHeader = document.getElementById('displayValidationStatus');
  const validationDesc = document.getElementById('displayValidationDesc');
  const passengerCat = document.getElementById('displayPassengerCat');
  const passengerQty = document.getElementById('displayPassengerQty');
  
  if (validationHeader) {
    if (ticket.status === 'expired') {
      validationHeader.textContent = labels.expired;
      validationHeader.className = "ticket-validity-status expired";
    } else if (ticket.isSumanPravas) {
      validationHeader.textContent = labels.suman;
      validationHeader.className = "ticket-validity-status suman";
    } else {
      validationHeader.textContent = labels.valid;
      validationHeader.className = "ticket-validity-status";
    }
  }
  
  if (validationDesc) {
    if (ticket.status === 'expired') {
      validationDesc.textContent = labels.expiredDesc;
    } else if (ticket.isSumanPravas) {
      validationDesc.textContent = labels.sumanDesc;
    } else {
      validationDesc.textContent = labels.validDesc;
    }
  }
  
  if (passengerCat) {
    passengerCat.textContent = ticket.isSumanPravas ? (lang === 'gu' ? "પુખ્ત વયના (પાસ)" : "Adult (Pass)") : labels.paxCat;
  }
  
  if (passengerQty) {
    if (lang === 'gu') {
      passengerQty.textContent = ticket.quantity + " ટિકિટ";
    } else {
      passengerQty.textContent = ticket.quantity + " Ticket" + (ticket.quantity > 1 ? "s" : "");
    }
  }
}
