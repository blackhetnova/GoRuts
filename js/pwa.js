/* ================================================================
 * PWA.JS — Progressive Web App Install & Service Worker
 * ================================================================
 * Contains:
 *   - beforeinstallprompt handler
 *   - installApp / dismissInstallBanner
 *   - appinstalled listener
 *   - Service Worker registration
 * Depends on: core.js (showToast)
 * ================================================================ */

// ─── PWA Install Prompt Handler ─────────────────────────────────
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

// ─── Service Worker Registration ────────────────────────────────
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
      
    // Automatically reload the page if a new service worker takes over
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  };

  if (document.readyState === 'complete') {
    registerSW();
  } else {
    window.addEventListener('load', registerSW);
  }
}
