// Register Service Worker and prompt when a new version is available.
(function () {
    const BANNER_DISMISS_KEY = 'fin-update-banner-dismissed';

    function showUpdateBanner() {
        const dismissed = sessionStorage.getItem(BANNER_DISMISS_KEY);
        if (dismissed === '1') {
            return;
        }
        const banner = document.getElementById('update-banner');
        if (banner) {
            banner.hidden = false;
        }
    }

    function hideUpdateBanner() {
        const banner = document.getElementById('update-banner');
        if (banner) {
            banner.hidden = true;
        }
    }

    function refreshForUpdate() {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
    }

    function bindBannerControls() {
        const refreshBtn = document.getElementById('update-banner-refresh');
        const dismissBtn = document.getElementById('update-banner-dismiss');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', refreshForUpdate);
        }
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                sessionStorage.setItem(BANNER_DISMISS_KEY, '1');
                hideUpdateBanner();
            });
        }
    }

    function trackWaitingWorker(registration) {
        if (registration.waiting) {
            showUpdateBanner();
        }
        registration.addEventListener('updatefound', () => {
            const worker = registration.installing;
            if (!worker) {
                return;
            }
            worker.addEventListener('statechange', () => {
                if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateBanner();
                }
            });
        });
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            bindBannerControls();

            navigator.serviceWorker.register('./service-worker.js')
                .then(registration => {
                    trackWaitingWorker(registration);
                    registration.update().catch(() => {});
                })
                .catch(error => {
                    console.warn('Service Worker registration failed:', error);
                });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                hideUpdateBanner();
            });
        });
    }
})();
