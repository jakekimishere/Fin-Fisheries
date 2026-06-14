/**
 * Theme preference — light / dark for bridge and night use.
 */
const ThemeManager = (function () {
    const STORAGE_KEY = 'fin-theme';
    const META_COLORS = { light: '#0f2744', dark: '#050a12' };

    function getPreferred() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function apply(theme) {
        const next = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY, next);

        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', META_COLORS[next]);

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
            toggleBtn.setAttribute(
                'aria-label',
                next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
    }

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        apply(current === 'dark' ? 'light' : 'dark');
    }

    function init() {
        apply(getPreferred());

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggle();
            });
        }

        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(STORAGE_KEY)) {
                    apply(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    return { init, toggle, apply, getPreferred };
})();

if (typeof window !== 'undefined') {
    window.ThemeManager = ThemeManager;
}
