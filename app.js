// Complete Surat BRTS Stops List (153+ stations)
const busStops = [
  "Aai Mata Chowk BRTS", "Abhishek Township BRTS", "Adajan Gam BRTS", "Adajan G.S.R.T.C. BRTS", "Adajan Patiya BRTS", "Airport Circle BRTS", "Althan Depot Terminal BRTS", "Amazia Amusement Park BRTS", "Amroli Char Rasta BRTS", "Anuvrat Dwar BRTS",
  "Athwa Gate BRTS", "Bardoli BRTS", "Bhestan BRTS", "Bhimrad Canal Road BRTS", "Canal Road BRTS", "City Center BRTS", "Daksheshwar Mahadev Junction BRTS", "Dindoli Varigruh BRTS", "Dumas BRTS", "Faram BRTS",
  "Gajera Circle BRTS", "Ghod Dod Road BRTS", "Hirabaug BRTS", "Honey Park BRTS", "Icchapore BRTS", "Jahangirpura BRTS", "Jahangirpura Community Hall BRTS", "Kadodara BRTS", "Kamrej BRTS", "Katargam BRTS",
  "Katargam Darwaja BRTS", "Kharwarnagar BRTS", "Khajod Gam BRTS", "Khatodara BRTS", "Kosad BRTS", "Kosad Depot BRTS", "Kosad EWS H2 BRTS", "Kosad Gam BRTS", "Lal Darwaja BRTS", "Lake Garden BRTS",
  "Majura Gate BRTS", "Makkai Pool BRTS", "Mini Bazaar BRTS", "Mora Char Rasta BRTS", "Mota Varachha BRTS", "Nana Varachha BRTS", "Navsari BRTS", "ONGC Colony BRTS", "Pal R.T.O. BRTS", "Palanpur Gam BRTS",
  "Pandesara BRTS", "Piplod BRTS", "Puna Canal BRTS", "Puna Patiya BRTS", "Railway Station BRTS", "Rander Gam BRTS", "Ring Road BRTS", "Rupali Junction BRTS", "Sachin G.I.D.C. BRTS", "Sachin Gam BRTS",
  "Sarthana BRTS", "Sarthana Jakat Naka BRTS", "Sarthana Nature Park BRTS", "Sayan BRTS", "SGM College Bhesan BRTS", "SIECC Road BRTS", "Simada Junction BRTS", "St. Thomas School Junction BRTS", "Surat Airport BRTS", "Textile Market BRTS",
  "Udhana BRTS", "Udhana Darwaja BRTS", "Udhana Magdalla Road BRTS", "Unn BRTS", "Unn Industrial Estate BRTS", "Utran ROB Bridge BRTS", "Varachha BRTS", "Variav Gam BRTS", "Ved Road BRTS", "Vesu Gaam BRTS",
  "Vesu VIP Road BRTS", "V.I.P. Road BRTS", "V.N.S.G.U. BRTS", "Vrukshlaxmi Society BRTS", "Y Junction Dumas Road BRTS", "Y Junction Udhana Magdalla Road BRTS", "Yogi Chowk BRTS", "Abhva Gam BRTS", "Airport BRTS", "Althan BRTS",
  "Amroli BRTS", "Anand Mahal Road BRTS", "Athwalines BRTS", "Bamroli BRTS", "Bhestan Garden BRTS", "Bhimrad BRTS", "Chiku Wadi BRTS", "Chowk BRTS",
  "City Light Road BRTS", "Dindoli BRTS", "Dumas Beach BRTS", "G.I.D.C. Sachin BRTS", "Gajera School BRTS", "Gopi Talav BRTS", "Green City Road BRTS", "Hirabaug Circle BRTS", "Jawaharlal Nehru Garden BRTS", "Kadodara Highway BRTS",
  "Kapodara BRTS", "Karanj BRTS", "Katar Gam BRTS", "Khajod BRTS", "Kharwarnagar Road BRTS", "Kosad Road BRTS", "Laxmidham Society BRTS", "Magdalla BRTS", "Majura Gate Circle BRTS", "Mini Bazar BRTS",
  "Mota Varachha Road BRTS", "Nana Varachha Road BRTS", "Navsari Highway BRTS", "New Civil Hospital BRTS", "Nirmal Hospital BRTS", "Paland BRTS", "Pandesara GIDC BRTS", "Parvat Gam BRTS", "Pipodara BRTS", "Puna Gam BRTS",
  "Rander Road BRTS", "Rander Talav BRTS", "Rangila Tower BRTS", "Sachin BRTS", "Sachin Depot BRTS", "Sachin GIDC Junction BRTS", "Sahara Darwaja BRTS", "Sarthana Depot BRTS", "Sayan Road BRTS", "SG Highway BRTS",
  "Shivaji Road BRTS", "Siddharth Nagar BRTS", "Simada BRTS", "Sindhi Market BRTS", "SMC Office BRTS", "Soni Falia BRTS", "Stadium Road BRTS", "Subhash Nagar BRTS", "Sumul Dairy Road BRTS", "Surya Kiran Road BRTS",
  "Tapi River Front BRTS", "Trikam Nagar BRTS", "Udhana Academy Road BRTS", "Udhana Darwaja Circle BRTS", "Udhana Main Road BRTS", "Udhana Sachin Road BRTS", "Utran BRTS", "Vadod BRTS", "Vadodara Road BRTS", "Vadodara-Surat Highway BRTS",
  "Varachha Road BRTS", "Ved Road Gam BRTS", "Vesu Canal Road BRTS", "Vesu Main Road BRTS", "Vesu VIP Road Gail Colony BRTS", "V.I.P. Road Circle BRTS", "Vivekanand College BRTS", "Yogi Chowk Road BRTS"
];

// Route mappings for BRTS stops
const routeMap = {
  "Aai Mata Chowk BRTS": ["11", "12", "13"], "Abhishek Township BRTS": ["14", "15"], "Adajan Gam BRTS": ["1", "2", "3", "4"], "Adajan G.S.R.T.C. BRTS": ["1", "2"], "Adajan Patiya BRTS": ["3", "4", "21"], "Airport Circle BRTS": ["136", "11"], "Althan Depot Terminal BRTS": ["15AA", "15CC", "21"], "Amazia Amusement Park BRTS": ["15AA", "15CC", "403", "504"], "Amroli Char Rasta BRTS": ["4", "5"], "Anuvrat Dwar BRTS": ["6"],
  "Athwa Gate BRTS": ["7", "8", "9"], "Bardoli BRTS": ["11", "15"], "Bhestan BRTS": ["1", "10", "315"], "Bhimrad Canal Road BRTS": ["116B", "11"], "Canal Road BRTS": ["12", "14", "22"], "City Center BRTS": ["1", "3", "7", "9"], "Daksheshwar Mahadev Junction BRTS": ["7"], "Dindoli Varigruh BRTS": ["16", "8"], "Dumas BRTS": ["206", "216"], "Faram BRTS": ["6", "1"],
  "Gajera Circle BRTS": ["10", "8"], "Ghod Dod Road BRTS": ["7", "8", "9"], "Hirabaug BRTS": ["8", "9"], "Honey Park BRTS": ["8", "3"], "Icchapore BRTS": ["7", "2"], "Jahangirpura BRTS": ["13", "21", "706"], "Jahangirpura Community Hall BRTS": ["13"], "Kadodara BRTS": ["13", "19", "109"], "Kamrej BRTS": ["17", "17E"], "Katargam BRTS": ["2", "4", "6"],
  "Katargam Darwaja BRTS": ["11"], "Kharwarnagar BRTS": ["20", "305"], "Khajod Gam BRTS": ["116A", "116B"], "Khatodara BRTS": ["2", "4"], "Kosad BRTS": ["6", "1", "14"], "Kosad Depot BRTS": ["16"], "Kosad EWS H2 BRTS": ["14", "20", "22"], "Kosad Gam BRTS": ["212", "226"], "Lal Darwaja BRTS": ["1", "6", "7", "8"], "Lake Garden BRTS": ["9"],
  "Majura Gate BRTS": ["2", "3", "9"], "Makkai Pool BRTS": ["217"], "Mini Bazaar BRTS": ["410"], "Mora Char Rasta BRTS": ["658"], "Mota Varachha BRTS": ["7", "2", "103", "410"], "Nana Varachha BRTS": ["12U", "17AU", "3", "5"], "Navsari BRTS": ["5", "10"], "ONGC Colony BRTS": ["12", "14", "5"], "Pal R.T.O. BRTS": ["17", "4", "5"], "Palanpur Gam BRTS": ["117"],
  "Pandesara BRTS": ["3", "8", "105"], "Piplod BRTS": ["3", "8", "1"], "Puna Canal BRTS": ["402"], "Puna Patiya BRTS": ["1"], "Railway Station BRTS": ["1", "2", "3", "4", "5", "18", "102", "103", "104", "105", "106", "107", "109", "112", "116A", "116B", "117", "118", "126", "127", "136", "137"], "Rander Gam BRTS": ["127"], "Ring Road BRTS": ["4", "5", "6"], "Rupali Junction BRTS": ["11", "14"], "Sachin G.I.D.C. BRTS": ["11", "17E"],
  "Sachin Gam BRTS": ["S-Connect"], "Sarthana BRTS": ["5", "10"], "Sarthana Jakat Naka BRTS": ["12", "22"], "Sarthana Nature Park BRTS": ["12", "22", "403"], "Sayan BRTS": ["118"], "SGM College Bhesan BRTS": ["217"], "SIECC Road BRTS": ["116A"], "Simada Junction BRTS": ["12U", "17AU"], "St. Thomas School Junction BRTS": ["6", "7"], "Surat Airport BRTS": ["136", "4"], "Textile Market BRTS": ["4", "9"],
  "Udhana BRTS": ["1", "2", "5", "8", "11"], "Udhana Darwaja BRTS": ["11", "1"], "Udhana Magdalla Road BRTS": ["12", "13"], "Unn BRTS": ["205"], "Unn Industrial Estate BRTS": ["305"], "Utran ROB Bridge BRTS": ["18"], "Varachha BRTS": ["3", "5", "10"], "Variav Gam BRTS": ["137"], "Ved Road BRTS": ["9", "4"], "Vesu Gaam BRTS": ["506"], "Vesu VIP Road BRTS": ["506", "716"],
  "V.I.P. Road BRTS": ["10", "5"], "V.N.S.G.U. BRTS": ["126", "226"], "Vrukshlaxmi Society BRTS": ["104", "209"], "Y Junction Dumas Road BRTS": ["11", "13"], "Y Junction Udhana Magdalla Road BRTS": ["12", "13"], "Yogi Chowk BRTS": ["9", "4"], "Abhva Gam BRTS": ["106"], "Airport BRTS": ["136"], "Althan BRTS": ["21"],
  "Amroli BRTS": ["4"], "Anand Mahal Road BRTS": ["2"], "Athwalines BRTS": ["7"], "Bamroli BRTS": ["5"], "Bhestan Garden BRTS": ["315", "504"], "Bhimrad BRTS": ["116B"], "Chiku Wadi BRTS": ["105"], "Chowk BRTS": ["202", "204", "205", "206", "207", "209", "212", "216", "217"],
  "City Light Road BRTS": ["3"], "Dindoli BRTS": ["8", "3"], "Dumas Beach BRTS": ["216"], "G.I.D.C. Sachin BRTS": ["11"], "Gajera School BRTS": ["10"], "Gopi Talav BRTS": ["153"], "Green City Road BRTS": ["5"], "Hirabaug Circle BRTS": ["8"], "Jawaharlal Nehru Garden BRTS": ["7"], "Kadodara Highway BRTS": ["13"],
  "Kapodara BRTS": ["153"], "Karanj BRTS": ["1"], "Katar Gam BRTS": ["2"], "Khajod BRTS": ["116A", "116B"], "Kharwarnagar Road BRTS": ["20"], "Kosad Road BRTS": ["16"], "Laxmidham Society BRTS": ["202"], "Magdalla BRTS": ["13"], "Majura Gate Circle BRTS": ["2", "3"], "Mini Bazar BRTS": ["410"],
  "Mota Varachha Road BRTS": ["103", "410"], "Nana Varachha Road BRTS": ["3", "5"], "Navsari Highway BRTS": ["5"], "New Civil Hospital BRTS": ["7"], "Nirmal Hospital BRTS": ["8"], "Paland BRTS": ["4"], "Pandesara GIDC BRTS": ["105"], "Parvat Gam BRTS": ["6"], "Pipodara BRTS": ["1"], "Puna Gam BRTS": ["402"],
  "Rander Road BRTS": ["127"], "Rander Talav BRTS": ["127"], "Rangila Tower BRTS": ["3"], "Sachin BRTS": ["11", "17E"], "Sachin Depot BRTS": ["11"], "Sachin GIDC Junction BRTS": ["11"], "Sahara Darwaja BRTS": ["1"], "Sarthana Depot BRTS": ["12"], "Sayan Road BRTS": ["118"], "SG Highway BRTS": ["4"],
  "Shivaji Road BRTS": ["1"], "Siddharth Nagar BRTS": ["5"], "Simada BRTS": ["12U", "17AU"], "Sindhi Market BRTS": ["1"], "SMC Office BRTS": ["1"], "Soni Falia BRTS": ["2"], "Stadium Road BRTS": ["7"], "Subhash Nagar BRTS": ["5"], "Sumul Dairy Road BRTS": ["4"], "Surya Kiran Road BRTS": ["3"],
  "Tapi River Front BRTS": ["206"], "Trikam Nagar BRTS": ["5"], "Udhana Academy Road BRTS": ["11"], "Udhana Darwaja Circle BRTS": ["11"], "Udhana Main Road BRTS": ["11"], "Udhana Sachin Road BRTS": ["11"], "Utran BRTS": ["18"], "Vadod BRTS": ["4"], "Vadodara Road BRTS": ["4"], "Vadodara-Surat Highway BRTS": ["4"],
  "Varachha Road BRTS": ["3", "5"], "Ved Road Gam BRTS": ["9"], "Vesu Canal Road BRTS": ["506"], "Vesu Main Road BRTS": ["506"], "Vesu VIP Road Gail Colony BRTS": ["716"], "V.I.P. Road Circle BRTS": ["10"], "Vivekanand College BRTS": ["107"], "Yogi Chowk Road BRTS": ["9"]
};

// SVG Node positions for selected stations in the SVG map
const mapStationCoordinates = {
  "Jahangirpura BRTS": { x: 60, y: 60 },
  "Sarthana BRTS": { x: 390, y: 60 },
  "Sayan BRTS": { x: 390, y: 120 },
  "Adajan Gam BRTS": { x: 60, y: 130 },
  "Katargam BRTS": { x: 320, y: 140 },
  "Rander Gam BRTS": { x: 60, y: 200 },
  "Majura Gate BRTS": { x: 170, y: 200 },
  "Railway Station BRTS": { x: 250, y: 200 },
  "Simada Junction BRTS": { x: 390, y: 190 },
  "Lal Darwaja BRTS": { x: 250, y: 260 },
  "Varachha BRTS": { x: 390, y: 260 },
  "Athwa Gate BRTS": { x: 170, y: 330 },
  "Textile Market BRTS": { x: 250, y: 330 },
  "Yogi Chowk BRTS": { x: 390, y: 330 },
  "Dumas BRTS": { x: 60, y: 400 },
  "Vesu Gaam BRTS": { x: 110, y: 400 },
  "Piplod BRTS": { x: 170, y: 400 },
  "City Center BRTS": { x: 250, y: 400 },
  "Katargam Darwaja BRTS": { x: 320, y: 400 },
  "Ring Road BRTS": { x: 390, y: 400 },
  "V.I.P. Road BRTS": { x: 170, y: 470 },
  "Ghod Dod Road BRTS": { x: 250, y: 470 },
  "Ved Road BRTS": { x: 390, y: 470 },
  "Surat Airport BRTS": { x: 60, y: 540 },
  "Althan BRTS": { x: 110, y: 540 },
  "Udhana BRTS": { x: 250, y: 540 },
  "Kosad BRTS": { x: 320, y: 540 },
  "Pandesara BRTS": { x: 390, y: 540 },
  "Bhimrad BRTS": { x: 110, y: 620 },
  "Bhestan BRTS": { x: 250, y: 620 },
  "Sachin G.I.D.C. BRTS": { x: 390, y: 620 },
  "Althan Depot Terminal BRTS": { x: 110, y: 680 },
  "Udhana Darwaja BRTS": { x: 250, y: 680 },
  "Sachin Gam BRTS": { x: 390, y: 680 }
};

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
  userName: 'Guest User',
  location: 'Surat, Gujarat',
  infiniteTimer: false,
  language: 'en'
};

// Notification alerts feed
const notificationsFeed = [
  { id: 1, type: 'alert', title: 'Route Delay Alert - Line 12U', text: 'Heavy traffic near Simada Junction is causing 10-15 minute delays on route 12U. Please plan accordingly.', time: 'Just now' },
  { id: 2, type: 'info', title: 'Suman Pravas Discount', text: 'Buy daily Suman Pravas pass for only Rs 30 and enjoy unlimited travel across Surat BRTS all day!', time: '2 hours ago' },
  { id: 3, type: 'info', title: 'Smart Entry Gate System', text: 'Surat Municipal Corporation is upgrading smart scanning terminals at all station entries for contactless ticketing.', time: '1 day ago' },
  { id: 4, type: 'alert', title: 'Holiday Operations Notice', text: 'On coming Sunday, BRTS services will start operations at 6:00 AM instead of 5:30 AM.', time: '2 days ago' }
];

// Languages translations
const langText = {
  en: {
    valid: "VALID TICKET",
    validDesc: "Scan at the smart entry gate & enjoy your ride",
    suman: "SUMAN PRAVAS PASS",
    sumanDesc: "Unlimited travel on all BRTS routes until 10:00 PM",
    expired: "EXPIRED PASS",
    expiredDesc: "This ticket has expired. Please buy a new ticket.",
    fromLabel: "From / Boarding",
    toLabel: "To / Destination",
    selectSrc: "Select Source",
    selectDst: "Select Destination",
    paxCat: "Adult (General)",
    paxQty: "1 Ticket"
  },
  gu: {
    valid: "માન્ય ટિકિટ",
    validDesc: "સ્માર્ટ એન્ટ્રી ગેટ પર સ્કેન કરો અને તમારી મુસાફરીનો આનંદ માણો",
    suman: "સુમન પ્રવાસ પાસ",
    sumanDesc: "રાત્રે ૧૦:૦૦ વાગ્યા સુધી તમામ BRTS રૂટ પર અમર્યાદિત મુસાફરી",
    expired: "સમાપ્ત થયેલ ટિકિટ",
    expiredDesc: "આ ટિકિટની સમયસીમા સમાપ્ત થઈ ગઈ છે. કૃપા કરીને નવી ટિકિટ ખરીદો.",
    fromLabel: "ક્યાંથી ઉપડવું",
    toLabel: "ક્યાં જવું",
    selectSrc: "ઉદ્ગમ સ્ટેશન પસંદ કરો",
    selectDst: "ગંતવ્ય સ્ટેશન પસંદ કરો",
    paxCat: "પુખ્ત વયના (સામાન્ય)",
    paxQty: "૧ ટિકિટ"
  }
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
  if (userPreferences.theme === 'dark') {
    themeToggle.classList.add('checked');
  }

  // Set default datetime value in ticket config (if element exists)
  const customTimeInput = document.getElementById('simCustomDateTime');
  if (customTimeInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    customTimeInput.value = now.toISOString().slice(0, 16);
  }
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
function navigateTo(pageId) {
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
    navigateTo(pageHistory.pop());
  } else {
    navigateTo('home');
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

// Edit Profile settings
function editProfileName() {
  const newName = prompt("Enter guest passenger name:", userPreferences.userName);
  if (newName && newName.trim() !== "") {
    userPreferences.userName = newName.trim();
    document.getElementById('userDisplayName').textContent = userPreferences.userName;
    savePreferences();
    showToast("Profile name updated!");
  }
}

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

// Geographic Lat/Lng positions for Surat BRTS Stations
const stationGeoCoordinates = {
  "Railway Station BRTS": [21.2052, 72.8406],
  "Lal Darwaja BRTS": [21.2023, 72.8322],
  "Textile Market BRTS": [21.1895, 72.8465],
  "Udhana BRTS": [21.1680, 72.8420],
  "Bhestan BRTS": [21.1340, 72.8450],
  "Sachin G.I.D.C. BRTS": [21.0820, 72.8590],
  "Adajan Gam BRTS": [21.1960, 72.7930],
  "Jahangirpura BRTS": [21.2320, 72.7840],
  "Sayan BRTS": [21.3200, 72.8800],
  "Sarthana BRTS": [21.2320, 72.9050],
  "Simada Junction BRTS": [21.2180, 72.8850],
  "Varachha BRTS": [21.2100, 72.8650],
  "Yogi Chowk BRTS": [21.2120, 72.8950],
  "Surat Airport BRTS": [21.1140, 72.7420],
  "Dumas BRTS": [21.0800, 72.7090],
  "Vesu Gaam BRTS": [21.1390, 72.7750],
  "Piplod BRTS": [21.1600, 72.7830],
  "Athwa Gate BRTS": [21.1780, 72.8120],
  "Majura Gate BRTS": [21.1820, 72.8220],
  "Ghod Dod Road BRTS": [21.1680, 72.8120],
  "V.I.P. Road BRTS": [21.1480, 72.7950],
  "Althan BRTS": [21.1520, 72.8150],
  "Bhimrad BRTS": [21.1350, 72.8050],
  "Katargam BRTS": [21.2250, 72.8350],
  "Rander Gam BRTS": [21.2100, 72.7980],
  "Pandesara BRTS": [21.1450, 72.8420],
  "Ring Road BRTS": [21.1890, 72.8350],
  "City Center BRTS": [21.1850, 72.8300]
};

// 6 Major BRTS Corridors Geographic LatLng Lines
const brtsCorridorsGeo = [
  { name: "Line 1: Udhna–Sarthana", color: "#E53935", points: [[21.232, 72.905], [21.218, 72.885], [21.210, 72.865], [21.2052, 72.8406], [21.2023, 72.8322], [21.1895, 72.8465], [21.168, 72.842], [21.134, 72.845], [21.082, 72.859]] },
  { name: "Line 2: Jahangirpura–Katargam", color: "#1E88E5", points: [[21.232, 72.784], [21.210, 72.798], [21.196, 72.793], [21.182, 72.822], [21.2052, 72.8406], [21.225, 72.835], [21.240, 72.845]] },
  { name: "Line 3: Althan–Varachha", color: "#43A047", points: [[21.140, 72.810], [21.152, 72.815], [21.168, 72.812], [21.185, 72.830], [21.1895, 72.8465], [21.210, 72.865], [21.232, 72.905]] },
  { name: "Line 4: Airport–Lal Darwaja", color: "#FB8C00", points: [[21.114, 72.742], [21.148, 72.795], [21.178, 72.812], [21.2023, 72.8322]] },
  { name: "Line 5: Dumas–Textile Market", color: "#8E24AA", points: [[21.080, 72.709], [21.139, 72.775], [21.160, 72.783], [21.185, 72.830], [21.1895, 72.8465]] },
  { name: "Line 6: Pandesara–Ring Road", color: "#00897B", points: [[21.145, 72.842], [21.168, 72.842], [21.189, 72.835], [21.215, 72.825]] }
];

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
