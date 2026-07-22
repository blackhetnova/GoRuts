/* ================================================================
 * TICKET.JS — Payment Details / Active Ticket Screen
 * ================================================================
 * Contains:
 *   - confirmAndPay (payment animation & ticket activation)
 *   - renderTicketDetails (populate ticket card fields)
 *   - generateTicketQR (small + expanded QR codes)
 *   - startTicketTimer (live countdown clock)
 *   - openFullQR / closeFullQR (expanded QR modal)
 *   - Simulator controls (qty, timestamp, validate, expire)
 *   - translateTicketContent (Gujarati/English labels)
 * Depends on: core.js, checkout.js (pendingTicket)
 * ================================================================ */

// ─── Confirm Payment & Generate Digital Pass ────────────────────
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

// ─── Render Ticket Detail Fields ────────────────────────────────
function renderTicketDetails(ticket) {
  // Format dynamic variables reference
  function formatStopNameForRouteTitle(stopName) {
    let clean = getShortStopName(stopName).toUpperCase();
    if (clean.length > 17) {
      return clean.substring(0, 16) + '...';
    }
    return clean;
  }
  
  const fromFormatted = formatStopNameForRouteTitle(ticket.fromStop);
  const toFormatted = formatStopNameForRouteTitle(ticket.toStop);
  
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
  document.getElementById('displayRefNo').textContent = ticket.ticketNo;
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
  document.getElementById('displayRouteTitle').innerHTML = `<span>${fromFormatted}</span><span style="flex-shrink:0; margin:0 6px; color:#666; font-weight:400">→</span><span>${toFormatted}</span>`;
  document.getElementById('displayRouteCodes').innerHTML = `<i class="fas fa-bus" style="font-size:12px; margin-right:4px;"></i> ${ticket.routes.join(', ')}`;
  
  // Generate QRs
  generateTicketQR(ticket);
  
  // Start countdown clock
  startTicketTimer(ticket);
}

// ─── Generate QR Codes (Small + Expanded Modal) ─────────────────
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
  
  // Render small QR (width & height reduced by 10px to 130)
  qrcodeInstance = new QRCode(document.getElementById('qrcode'), {
    text: qrPayload,
    width: 130,
    height: 130,
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

// ─── Live Countdown Timer ───────────────────────────────────────
function startTicketTimer(ticket) {
  if (countdownTimer) clearInterval(countdownTimer);
  
  const timerDisplay = document.getElementById('displayCountdown');
  if (!timerDisplay || !ticket) return;

  // If ticket is already expired, show EXPIRED immediately without resetting
  if (ticket.status === 'expired' || (ticket.expiryTime && ticket.expiryTime <= Date.now())) {
    timerDisplay.textContent = 'EXPIRED';
    timerDisplay.className = 'ticket-timer-display expired';
    if (ticket.status !== 'expired') {
      ticket.status = 'expired';
      saveHistoryToStorage();
    }
    return;
  }
  
  function tick() {
    if (!ticket) return;
    const now = Date.now();
    
    // Check if force expired simulation
    if (ticket.status === 'expired') {
      if (countdownTimer) clearInterval(countdownTimer);
      timerDisplay.textContent = 'EXPIRED';
      timerDisplay.className = 'ticket-timer-display expired';
      return;
    }
    
    const diff = ticket.expiryTime - now;
    
    if (diff <= 0) {
      if (countdownTimer) clearInterval(countdownTimer);
      ticket.status = 'expired';
      saveHistoryToStorage();
      
      timerDisplay.textContent = 'EXPIRED';
      timerDisplay.className = 'ticket-timer-display expired';
      translateTicketContent(ticket);
      return;
    }
    
    // Format live countdown (01 : 59 : 59 -> 01 : 59 : 58 ...)
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    const hStr = String(hours).padStart(2, '0');
    const mStr = String(mins).padStart(2, '0');
    const sStr = String(secs).padStart(2, '0');
    
    timerDisplay.textContent = `${hStr} : ${mStr} : ${sStr}`;
    timerDisplay.className = 'ticket-timer-display';
  }
  
  tick();
  countdownTimer = setInterval(tick, 1000);
}




// ─── Expanded QR Modal ──────────────────────────────────────────
function openFullQR() {
  if (currentTicket && currentTicket.status !== 'expired') {
    document.getElementById('qrModal').classList.add('show');
  } else {
    showToast("Expired ticket QR cannot be expanded");
  }
}


function closeFullQR() {
  document.getElementById('qrModal').classList.remove('show');
}

// ─── Simulator: Adjust Passenger Quantity ───────────────────────
function adjustPaxQty() {
  if (!currentTicket) return;
  const qty = parseInt(document.getElementById('simPaxQty').value);
  currentTicket.quantity = qty;
  
  // Re-save & re-render
  saveHistoryToStorage();
  renderTicketDetails(currentTicket);
  showToast(`Quantity adjusted to ${qty} Adult passenger${qty > 1 ? 's' : ''}`);
}

// ─── Simulator: Adjust Timestamp ────────────────────────────────
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
      currentTicket.expiryTime = currentTicket.isSumanPravas ? getSumanExpiryTimeFor(now) : now + (2 * 60 * 60 * 1000);
      currentTicket.status = 'valid';
    } else if (mode === 'yesterday') {
      const yesterday = now - (24 * 60 * 60 * 1000);
      currentTicket.purchaseTime = yesterday;
      currentTicket.expiryTime = currentTicket.isSumanPravas ? getSumanExpiryTimeFor(yesterday) : yesterday + (2 * 60 * 60 * 1000);
      currentTicket.status = 'expired';
    }
    
    saveHistoryToStorage();
    renderTicketDetails(currentTicket);
  }
}

// ─── Simulator: Apply Custom Timestamp ──────────────────────────
function applyCustomTimestamp() {
  if (!currentTicket) return;
  const val = document.getElementById('simCustomDateTime').value;
  if (!val) return;
  
  const customDate = new Date(val);
  const timeMs = customDate.getTime();
  
  currentTicket.purchaseTime = timeMs;
  currentTicket.expiryTime = currentTicket.isSumanPravas ? getSumanExpiryTimeFor(timeMs) : timeMs + (2 * 60 * 60 * 1000);
  
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

// ─── Simulator: Self-Validate (Gate Scan) ───────────────────────
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

// ─── Simulator: Force Expire Ticket ─────────────────────────────
function simulateExpireTicket() {
  if (!currentTicket) return;
  currentTicket.status = 'expired';
  saveHistoryToStorage();
  
  renderTicketDetails(currentTicket);
  showToast("Ticket forced to Expired state");
}

// ─── Translation: Dynamic Ticket Content (EN/GU) ────────────────
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
