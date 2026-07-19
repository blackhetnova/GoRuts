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
