/* ================================================================
 * MAP.JS — Transit Map Screen
 * ================================================================
 * Contains:
 *   - SVG schematic map: station click handlers & highlighting
 *   - getMapNodeId (station name → SVG element ID lookup)
 *   - Leaflet interactive map: init, markers, corridors, trip route
 *   - setStationFromMap (Leaflet popup → set from/to)
 *   - Google Maps link, map source toggle, view mode switcher
 *   - locateUserOnMap (geolocation)
 * Depends on: core.js (globals, showToast),
 *             data.js (mapStationCoordinates, stationGeoCoordinates, brtsCorridorsGeo)
 * ================================================================ */

// ─── SVG Schematic Map: Station Click Handler ───────────────────
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

// ─── SVG Highlighting & Bus Animation ───────────────────────────
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

// ─── Station Name → SVG Node ID Lookup ──────────────────────────
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

// ─── Leaflet Interactive Map ────────────────────────────────────
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

// ─── Leaflet: Set Station from Map Popup ────────────────────────
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

// ─── Leaflet: Draw Trip Route Polyline ──────────────────────────
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

// ─── Google Maps External Link ──────────────────────────────────
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

// ─── Map Source Toggle (Leaflet ↔ Google) ───────────────────────
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

// ─── Map View Mode Switcher (Interactive / Official / Schematic) ─
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

// ─── Geolocation: Locate User on Map ────────────────────────────
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
