class Navbar {
    constructor() {
        this.createNavbar();
        this.setupEventListeners();
    }

    createNavbar() {
        const navbar = document.createElement('nav');
        navbar.className = 'navbar';
        navbar.innerHTML = `
            <div class="navbar-container">
                <a href="/index.html" class="navbar-brand">JS Projects</a>
                <button class="navbar-toggle" aria-label="Toggle navigation">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12h18M3 6h18M3 18h18"></path>
                    </svg>
                </button>
                <ul class="navbar-nav">
                    <li><a href="/index.html" class="nav-link">Home</a></li>
                    <li><a href="https://github.com" target="_blank" class="nav-link">GitHub</a></li>
                    <li><a href="https://youtube.com/@chaiaurcode" target="_blank" class="nav-link">YouTube</a></li>
                </ul>
            </div>
        `;

        // Insert navbar at the beginning of the body
        document.body.insertBefore(navbar, document.body.firstChild);

        // Set active link
        this.setActiveLink();
    }

    setupEventListeners() {
        const toggle = document.querySelector('.navbar-toggle');
        const nav = document.querySelector('.navbar-nav');

        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        });
    }

    setActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
}); 