/* ================================================================
 * HOME.JS — Home Screen Logic
 * ================================================================
 * Contains:
 *   - Stop initialization & search/filter/select
 *   - Swap source/destination
 *   - Route matching & fare calculation
 *   - Ticket number generation
 *   - Quick rebook list rendering
 * Depends on: core.js (globals, showToast), data.js (busStops, routeMap, langText)
 * ================================================================ */

// ─── Initialize Default Source & Destination ────────────────────
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

// ─── Open Stop Search Page ──────────────────────────────────────
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

// ─── Dynamic Stop List Rendering ────────────────────────────────
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

// ─── Filter Stops by Search Query ───────────────────────────────
function filterSearchStops() {
  const query = document.getElementById('stopSearchInput').value.toLowerCase().trim();
  if (query === '') {
    renderStopsList(busStops);
    return;
  }
  
  const filtered = busStops.filter(stop => stop.toLowerCase().includes(query));
  renderStopsList(filtered);
}

// ─── Select a Stop Item ─────────────────────────────────────────
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

// ─── Swap Source / Destination ───────────────────────────────────
function swapStops() {
  const temp = selectedFrom;
  selectedFrom = selectedTo;
  selectedTo = temp;
  
  const labels = langText[userPreferences.language];
  document.getElementById('fromStopLabel').textContent = selectedFrom || labels.selectSrc;
  document.getElementById('toStopLabel').textContent = selectedTo || labels.selectDst;
  
  showToast("Stops swapped!");
}

// ─── Route Matching ─────────────────────────────────────────────
function getCommonRoutes(stop1, stop2) {
  const r1 = routeMap[stop1] || [];
  const r2 = routeMap[stop2] || [];
  const common = r1.filter(r => r2.includes(r));
  return common.length > 0 ? common : ["12U", "17AU"];
}

// ─── Fare Calculation ───────────────────────────────────────────
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

// ─── Utility: Short Stop Name ───────────────────────────────────
function getShortStopName(stopName) {
  if (!stopName) return "Select Station";
  return stopName.replace(/ BRTS$/i, "").replace(/\s+/g, " ").trim();
}

// ─── Utility: Generate Ticket Number ────────────────────────────
function generateTicketNumber() {
  return "7101" + Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

// ─── Quick Rebook List (Home Screen) ────────────────────────────
function quickRebookList() {
  const container = document.getElementById('quickRebookList');
  if (!container) return;
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

// ─── Click Handlers for Quick Rebook ────────────────────────────
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
