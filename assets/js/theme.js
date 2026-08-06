(function () {
    const root = document.documentElement;
    const toggle = document.querySelector('.theme-toggle');

    if (!toggle) return;

    function currentTheme() {
        return root.dataset.theme === 'light' ? 'light' : 'dark';
    }

    function updateToggle(theme) {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        toggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
        toggle.setAttribute('title', `Switch to ${nextTheme} mode`);
        toggle.setAttribute('aria-pressed', String(theme === 'light'));
    }

    updateToggle(currentTheme());

    toggle.addEventListener('click', function () {
        const theme = currentTheme() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = theme;
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            // The theme still changes when storage is unavailable.
        }
        updateToggle(theme);
    });
}());
