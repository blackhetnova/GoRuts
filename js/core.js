/* ================================================================
 * CORE.JS — Global State, Initialization & Shared Utilities
 * ================================================================
 * Contains:
 *   - Global app state variables
 *   - DOMContentLoaded bootstrap
 *   - LocalStorage load/save for preferences & history
 *   - Dark mode, infinite timer, language toggles
 *   - Toast notification utility
 * ================================================================ */

// ─── Global App States ──────────────────────────────────────────
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

// ─── User Configs & Simulator Preferences ───────────────────────
let userPreferences = {
  theme: 'light',
  userName: 'Panth',
  location: 'Surat, Gujarat',
  infiniteTimer: false,
  language: 'en'
};

// ─── Initialize App ─────────────────────────────────────────────
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

// ─── LocalStorage: Load ─────────────────────────────────────────
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

// ─── LocalStorage: Save Preferences ────────────────────────────
function savePreferences() {
  try {
    localStorage.setItem('gorutes_prefs', JSON.stringify(userPreferences));
  } catch (e) {
    console.error("Failed to save preferences to localStorage:", e);
  }
}

// ─── LocalStorage: Save Booking History ─────────────────────────
function saveHistoryToStorage() {
  try {
    localStorage.setItem('gorutes_history', JSON.stringify(bookingHistory));
  } catch (e) {
    console.error("Failed to save booking history to localStorage:", e);
  }
}

// ─── Dark Mode Toggle ───────────────────────────────────────────
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

// ─── Infinite Countdown Timer Toggle ────────────────────────────
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

// ─── Language Translation Toggle ────────────────────────────────
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

// ─── Toast Notification ─────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
