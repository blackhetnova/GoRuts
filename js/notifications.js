/* ================================================================
 * NOTIFICATIONS.JS — Notifications Screen & Search Bar
 * ================================================================
 * Contains:
 *   - Notification feed rendering
 *   - Search bar route code quick-search
 *   - Select stop from search results
 * Depends on: core.js (showToast), data.js (notificationsFeed, routeMap)
 * ================================================================ */

// ─── Render Notification Feed ───────────────────────────────────
function renderNotifications() {
  const container = document.getElementById('alertsListArea');
  container.innerHTML = notificationsFeed.map(item => `
    <div style="background:#fff; border-radius:12px; margin: 16px; padding:16px; box-shadow:0 1px 8px rgba(0,0,0,0.06); font-family: 'Inter', sans-serif;">
      <div style="text-align:center; font-size:14px; font-weight:700; color:#333; margin-bottom:16px;">
        ${item.time}
      </div>
      <div style="display:flex; align-items:flex-start;">
        ${item.hasIcon ? '<i class="fas fa-bus" style="color:#1E88E5; font-size:18px; margin-right:12px; margin-top:2px; flex-shrink:0;"></i>' : ''}
        <div style="font-size:13px; color:#555; line-height:1.6; font-weight: 400;">
          ${item.text}
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Search Bar: Quick Route Code Lookup ────────────────────────
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

// ─── Select Stop from Search Results ────────────────────────────
function selectSearchedRouteStop(stopName) {
  selectedFrom = stopName;
  document.getElementById('fromStopLabel').textContent = stopName;
  document.getElementById('routeSearchInput').value = "";
  document.getElementById('routeSearchResults').style.display = "none";
  showToast(`Source set to: ${stopName.replace(" BRTS", "")}`);
}
