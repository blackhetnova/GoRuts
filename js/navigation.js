/* ================================================================
 * NAVIGATION.JS — Page Router, Side Menu & Drawer Modals
 * ================================================================
 * Contains:
 *   - SPA page router (navigateTo, goBack, pushHistory)
 *   - Side menu open/close
 *   - Login/profile modal
 *   - Share app, delete account, logout
 *   - All side-drawer modal open/close/submit handlers
 * Depends on: core.js (globals, showToast, savePreferences)
 * ================================================================ */

// ─── Navigation Router ──────────────────────────────────────────
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

  // Toggle bottom navigation bar and body padding depending on the active page
  const bottomNav = document.querySelector('.bottom-nav');
  if (bottomNav) {
    if (pageId === 'payment-details' || pageId === 'checkout') {
      bottomNav.style.display = 'none';
      document.body.style.paddingBottom = '0';
    } else {
      bottomNav.style.display = 'flex';
      document.body.style.paddingBottom = '76px';
    }
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
  if (pageId === 'payment-details') {
    if (!currentTicket && bookingHistory.length > 0) {
      currentTicket = bookingHistory[0];
    }
    if (!currentTicket) {
      currentTicket = {
        id: 'ticket_' + Date.now(),
        ticketNo: '7101000116300361',
        refNo: '7101000116300361',
        fromStop: 'Simada Junction BRTS',
        toStop: 'Nana Varachha BRTS',
        isSumanPravas: false,
        routes: ['12U', '17AU'],
        baseFare: 10,
        discount: 2,
        netPayable: 8,
        quantity: 1,
        paxCategory: 'Adult (General)',
        purchaseTime: Date.now(),
        expiryTime: Date.now() + (2 * 60 * 60 * 1000),
        status: 'valid'
      };
    }
    renderTicketDetails(currentTicket);
  } else if (pageId === 'booking') {
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

// ─── Side Menu Toggle ───────────────────────────────────────────
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

// ─── Login / Edit Profile Modal ─────────────────────────────────
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  const input = document.getElementById('loginNameInput');
  if (input) input.value = userPreferences.userName || 'Panth';
  if (modal) modal.classList.add('open');
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('open');
}

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

// ─── Share, Delete Account & Logout ─────────────────────────────
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

// ─── Side Drawer Modal Handlers ─────────────────────────────────
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
