/* ================================================================
 * BOOKING.JS — My Bookings / Booking History Screen
 * ================================================================
 * Contains:
 *   - Active/History tab toggle
 *   - Booking list rendering with status badges
 *   - Open ticket from history
 *   - Clear history
 *   - Reset simulator data
 * Depends on: core.js (globals, showToast, saveHistoryToStorage),
 *             home.js (getShortStopName), ticket.js (renderTicketDetails)
 * ================================================================ */

// ─── Tab Toggle (Active / History) ──────────────────────────────
function toggleBookingTabs(tab) {
  activeHistoryTab = tab;
  document.getElementById('tabActiveBtn').className = tab === 'active' ? 'tab-btn active' : 'tab-btn';
  document.getElementById('tabHistoryBtn').className = tab === 'history' ? 'tab-btn active' : 'tab-btn';
  renderHistoryList();
}

// ─── Render Booking History List ────────────────────────────────
function renderHistoryList() {
  const container = document.getElementById('bookingsListArea');
  if (bookingHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding-top:30px; color:#555; font-size:16px;">
        No Booking Available
      </div>
    `;
    return;
  }
  
  // Show all tickets, newest first
  const tickets = [...bookingHistory].reverse();
  
  container.innerHTML = tickets.map(ticket => {
    const isSuman = ticket.isSumanPravas;
    const dateObj = new Date(ticket.purchaseTime);
    
    // Format: "DD/MM/YYYY HH:mm:ss"
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    const hh = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');
    const ss = String(dateObj.getSeconds()).padStart(2, '0');
    const txnDate = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;

    const expObj = new Date(ticket.expiryTime);
    const edd = String(expObj.getDate()).padStart(2, '0');
    const emm = String(expObj.getMonth() + 1).padStart(2, '0');
    const eyyyy = expObj.getFullYear();
    const ehh = String(expObj.getHours()).padStart(2, '0');
    const emin = String(expObj.getMinutes()).padStart(2, '0');
    const ess = String(expObj.getSeconds()).padStart(2, '0');
    const expDate = `${edd}/${emm}/${eyyyy} ${ehh}:${emin}:${ess}`;
    
    // Status color
    const now = Date.now();
    const isExpired = ticket.status === 'expired' || (!userPreferences.infiniteTimer && ticket.expiryTime <= now);
    const statusText = isExpired ? 'Expired' : 'Active';
    const statusColor = isExpired ? '#E53935' : '#43A047';

    // Order ID purely digits based on timestamp + random 5 digits (or padded ticket number)
    const orderId = `${yyyy}${mm}${dd}${hh}${min}${ss}00701`;

    let routeHtml = '';
    if (isSuman) {
      routeHtml = `${ticket.fromStop.toUpperCase()}`;
    } else {
      routeHtml = `${ticket.fromStop.toUpperCase()} <span style="color:#1E88E5;">TO</span><br>${ticket.toStop.toUpperCase()}`;
    }

    return `
      <div style="background:#fff; border-radius:12px; margin: 16px; padding:16px 16px 8px 16px; box-shadow:0 1px 8px rgba(0,0,0,0.06); font-family: 'Inter', sans-serif;" onclick="openTicketFromHistory('${ticket.id}')">
        <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#000;">TXN Date and Time</div>
            <div style="font-size:12px; color:#444;">${txnDate}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12px; color:#444;">Payment</div>
            <div style="font-size:12px; color:#444;">Received</div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#000;">EXP Date and Time</div>
            <div style="font-size:12px; color:#444;">${expDate}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:14px; color:#000;">₹ ${(ticket.netPayable * ticket.quantity).toFixed(1)}</div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#000;">Order ID</div>
            <div style="font-size:12px; color:#444;">${orderId}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12px; color:${statusColor};">${statusText}</div>
          </div>
        </div>

        <div style="margin-bottom:12px;">
          <div style="font-size:12px; font-weight:700; color:#000;">Ticket number</div>
          <div style="font-size:12px; color:#444;">${ticket.ticketNo}</div>
        </div>

        <div style="border-top:1px solid #000; margin:12px 0;"></div>

        <div style="display:flex; align-items:flex-start; margin-bottom: 12px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; margin-top:2px; flex-shrink:0;">
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="6" r="3"></circle>
            <line x1="8" y1="16" x2="16" y2="8"></line>
          </svg>
          <div style="font-size:11px; font-weight:700; color:#333; line-height:1.4;">
            ${routeHtml}
          </div>
        </div>
        
        <div style="border-top:1px solid #000; margin-bottom:24px;"></div>
      </div>
    `;
  }).join('');
}

// ─── Open Ticket from History ───────────────────────────────────
function openTicketFromHistory(ticketId) {
  const ticket = bookingHistory.find(t => t.id === ticketId);
  if (ticket) {
    currentTicket = ticket;
    pushHistory('booking');
    navigateTo('payment-details');
    renderTicketDetails(ticket);
  }
}

// ─── Clear All Booking History ──────────────────────────────────
function clearHistory() {
  if (confirm("Are you sure you want to clear booking history logs?")) {
    bookingHistory = [];
    localStorage.setItem('gorutes_history', JSON.stringify([]));
    renderHistoryList();
    showToast("Booking history cleared");
  }
}

// ─── Reset Simulator Preferences & Data ─────────────────────────
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
