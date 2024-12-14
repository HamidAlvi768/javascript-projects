import themes from './themes.js';

class ThemeSwitcher {
    constructor() {
        this.themes = themes;
        this.currentTheme = null;
        this.systemPreference = null;
        
        // DOM elements
        this.themeOptions = document.getElementById('themeOptions');
        this.systemPreferenceText = document.getElementById('systemPreference');
        this.resetButton = document.getElementById('resetTheme');
        
        this.init();
    }

    init() {
        // Check for CSS custom property support
        if (!this.supportsCSSCustomProperties()) {
            console.warn('Browser does not support CSS custom properties');
            return;
        }

        // Create theme buttons
        this.createThemeButtons();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Check system preference
        this.checkSystemColorScheme();
        
        // Load saved theme or use system preference
        this.loadSavedTheme();
    }

    supportsCSSCustomProperties() {
        return window.CSS && CSS.supports('color', 'var(--test)');
    }

    createThemeButtons() {
        Object.values(this.themes).forEach(theme => {
            const button = document.createElement('button');
            button.className = 'theme-button';
            button.setAttribute('data-theme', theme.id);
            button.setAttribute('aria-label', `Switch to ${theme.name} theme`);
            
            // Theme name
            const name = document.createElement('span');
            name.textContent = theme.name;
            
            // Color swatches
            const colorPreview = document.createElement('div');
            colorPreview.className = 'color-preview';
            
            ['primary', 'secondary', 'background'].forEach(colorKey => {
                const swatch = document.createElement('span');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = theme.colors[colorKey];
                colorPreview.appendChild(swatch);
            });
            
            button.appendChild(name);
            button.appendChild(colorPreview);
            this.themeOptions.appendChild(button);
        });
    }

    setupEventListeners() {
        // Theme button clicks
        this.themeOptions.addEventListener('click', (e) => {
            const button = e.target.closest('.theme-button');
            if (button) {
                const themeId = button.dataset.theme;
                this.setTheme(themeId);
            }
        });

        // Reset button
        this.resetButton.addEventListener('click', () => {
            this.resetToSystemPreference();
        });

        // System preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
            this.checkSystemColorScheme();
            if (!this.currentTheme) {
                this.resetToSystemPreference();
            }
        });
    }

    checkSystemColorScheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.systemPreference = isDarkMode ? 'dark' : 'default';
        this.systemPreferenceText.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    }

    setTheme(themeId) {
        const theme = this.themes[themeId];
        if (!theme) return;

        // Update CSS custom properties
        Object.entries(theme.colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });

        // Update data attribute
        document.documentElement.setAttribute('data-theme', themeId);

        // Update active button state
        this.updateActiveButton(themeId);

        // Save theme preference
        this.saveTheme(themeId);

        this.currentTheme = themeId;
    }

    updateActiveButton(themeId) {
        const buttons = this.themeOptions.querySelectorAll('.theme-button');
        buttons.forEach(button => {
            button.classList.toggle('active', button.dataset.theme === themeId);
        });
    }

    saveTheme(themeId) {
        localStorage.setItem('selected-theme', themeId);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('selected-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.setTheme(savedTheme);
        } else {
            this.resetToSystemPreference();
        }
    }

    resetToSystemPreference() {
        localStorage.removeItem('selected-theme');
        this.currentTheme = null;
        this.setTheme(this.systemPreference);
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});
