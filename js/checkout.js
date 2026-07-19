/* ================================================================
 * CHECKOUT.JS — Checkout & Payment Gateway Screen
 * ================================================================
 * Contains:
 *   - proceedToPayment (validate & build pending ticket)
 *   - generateSumanPravas (daily pass builder)
 *   - openCheckoutPage (render order summary & UPI QR)
 *   - selectPaymentMethod (radio toggle UI)
 *   - getSumanExpiryTimeFor (helper: 10 PM same-day expiry)
 * Depends on: core.js, home.js (calculateFare, getCommonRoutes, etc.)
 * ================================================================ */

// ─── Pending Ticket State ───────────────────────────────────────
let pendingTicket = null;
let selectedPaymentMethodType = 'upi';

// ─── Process Booking → Open Payment Gateway ─────────────────────
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
    expiryTime: timestamp + (2 * 60 * 60 * 1000), // 2 hr validity
    status: 'valid'
  };
  
  openCheckoutPage(pendingTicket);
}

// ─── Generate Suman Pravas Daily Pass ───────────────────────────
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

// ─── Render Checkout Order Summary & Payment QR ─────────────────
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

// ─── Select Payment Method Radio & Detail Box ───────────────────
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

// ─── Suman Pravas Expiry Calculator (IST End of Day) ────────────
function getSumanExpiryTimeFor(timestamp) {
  const istOffset = 5.5 * 60 * 60 * 1000;
  const d = new Date(timestamp + istOffset);
  d.setUTCHours(23, 59, 59, 999);
  return d.getTime() - istOffset;
}
