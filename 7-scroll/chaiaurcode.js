// Configuration object for customization
const defaultConfig = {
    colors: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        glow: 'rgba(76, 175, 80, 0.5)'
    },
    animation: {
        duration: 300,
        easing: 'ease-out'
    },
    scrollSensitivity: 1,
    features: {
        tooltip: true,
        glow: true,
        lottie: true
    }
};

class ScrollProgressIndicator {
    constructor(config = {}) {
        // Merge default config with user config
        this.config = { ...defaultConfig, ...config };
        
        // DOM Elements
        this.progressFill = document.querySelector('.progress-fill');
        this.progressGlow = document.querySelector('.progress-glow');
        this.tooltip = document.querySelector('.progress-tooltip');
        this.lottiePlayer = document.querySelector('#progressAnimation');
        
        // State
        this.lastScrollPercentage = 0;
        this.rafId = null;
        this.isUpdating = false;
        
        this.init();
    }

    init() {
        // Initialize styles
        this.applyStyles();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize Lottie if enabled
        if (this.config.features.lottie && this.lottiePlayer) {
            this.setupLottieAnimation();
        }
        
        // Initial update
        this.updateProgress();
    }

    applyStyles() {
        document.documentElement.style.setProperty('--primary-color', this.config.colors.primary);
        document.documentElement.style.setProperty('--progress-glow', this.config.colors.glow);
        document.documentElement.style.setProperty('--animation-duration', `${this.config.animation.duration}ms`);
    }

    setupEventListeners() {
        // Optimized scroll handler using requestAnimationFrame
        window.addEventListener('scroll', () => {
            if (!this.isUpdating) {
                this.isUpdating = true;
                this.rafId = requestAnimationFrame(() => this.updateProgress());
            }
        }, { passive: true });

        // Handle customization controls
        this.setupCustomizationControls();
    }

    setupCustomizationControls() {
        const primaryColorInput = document.getElementById('primaryColor');
        const animationSpeedInput = document.getElementById('animationSpeed');
        const glowEffectInput = document.getElementById('glowEffect');

        if (primaryColorInput) {
            primaryColorInput.addEventListener('input', (e) => {
                this.config.colors.primary = e.target.value;
                this.applyStyles();
            });
        }

        if (animationSpeedInput) {
            animationSpeedInput.addEventListener('input', (e) => {
                this.config.animation.duration = 300 / parseFloat(e.target.value);
                this.applyStyles();
            });
        }

        if (glowEffectInput) {
            glowEffectInput.addEventListener('change', (e) => {
                this.config.features.glow = e.target.checked;
                this.progressGlow.style.display = e.target.checked ? 'block' : 'none';
            });
        }
    }

    setupLottieAnimation() {
        if (window.LottieInteractivity) {
            LottieInteractivity.create({
                player: '#progressAnimation',
                mode: 'scroll',
                actions: [
                    {
                        visibility: [0, 1.0],
                        type: 'seek',
                        frames: [0, 100]
                    }
                ]
            });
        }
    }

    calculateScrollPercentage() {
        const docElement = document.documentElement;
        const scrollTop = window.scrollY || docElement.scrollTop;
        const scrollHeight = docElement.scrollHeight - docElement.clientHeight;
        return (scrollTop / scrollHeight) * 100;
    }

    updateProgress() {
        const scrollPercentage = this.calculateScrollPercentage();
        
        // Update progress bar
        this.progressFill.style.transform = `scaleX(${scrollPercentage / 100})`;
        
        // Update tooltip if enabled
        if (this.config.features.tooltip && this.tooltip) {
            this.tooltip.textContent = `${Math.round(scrollPercentage)}%`;
        }
        
        // Update glow effect if enabled
        if (this.config.features.glow && this.progressGlow) {
            this.progressGlow.classList.toggle('active', scrollPercentage > 0);
        }
        
        // Update Lottie animation if enabled
        if (this.config.features.lottie && this.lottiePlayer && !window.LottieInteractivity) {
            const frame = (scrollPercentage / 100) * this.lottiePlayer.getTotalFrames();
            this.lottiePlayer.goToAndStop(frame, true);
        }
        
        // Reset update flag
        this.isUpdating = false;
        this.lastScrollPercentage = scrollPercentage;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = new ScrollProgressIndicator({
        colors: {
            primary: '#4CAF50',
            glow: 'rgba(76, 175, 80, 0.5)'
        },
        features: {
            tooltip: true,
            glow: true,
            lottie: true
        }
    });
});
