/**
 * Electronics E-commerce Main Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle hamburger icon animation
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                if (spans.length === 3) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                }
            } else {
                if (spans.length === 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }

    // 2. Dashboard Sidebar Toggle (for Mobile)
    const dashboardHamburger = document.querySelector('.dashboard-hamburger');
    const sidebar = document.querySelector('.dashboard-sidebar');

    if (dashboardHamburger && sidebar) {
        dashboardHamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = 'var(--shadow-card)';
                navbar.style.background = 'var(--nav-bg-solid)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'var(--nav-bg)';
            }
        });
    }

    // 4. Flash Sale Countdown Timer (For Home 1)
    const initCountdown = () => {
        const countdownElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        if (!countdownElements.days) return;

        // Set date to 3 days from now for demo
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) return;

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElements.days.innerText = d.toString().padStart(2, '0');
            countdownElements.hours.innerText = h.toString().padStart(2, '0');
            countdownElements.minutes.innerText = m.toString().padStart(2, '0');
            countdownElements.seconds.innerText = s.toString().padStart(2, '0');
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    };

    initCountdown();

    // 5. Active Link Highlighting
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        // Handle cases like 'index.html', '/', or just being on the page
        if (href && (currentLocation.endsWith(href) || (currentLocation === '/' && href === 'index.html'))) {
            item.classList.add('active');
            
            // Also highlight parent dropdown if it exists
            const parentDropdown = item.closest('.dropdown');
            if (parentDropdown) {
                const dropBtn = parentDropdown.querySelector('.dropbtn');
                if (dropBtn) dropBtn.classList.add('active');
            }
        } else {
            item.classList.remove('active');
        }
    });

    // 6. Dropdown Click Toggle (for Mobile/Touch)
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropBtn = dropdown.querySelector('.dropbtn');

        if (dropBtn) {
            dropBtn.addEventListener('click', (e) => {
                // If we are in mobile view, or if it's a touch interaction, toggle instead of navigate
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) other.classList.remove('active');
                    });

                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // 7. Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const htmlElement = document.documentElement;

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Initialize theme based on preference or system
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(savedTheme || systemTheme);
    };

    initTheme();

    // 8. RTL/LTR Toggle
    const rtlBtn = document.getElementById('rtl-btn');
    
    if (rtlBtn) {
        const updateRTL = (isRTL) => {
            htmlElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
            if (isRTL) {
                rtlBtn.classList.add('rtl-active');
            } else {
                rtlBtn.classList.remove('rtl-active');
            }

            const rtlBtnLabel = rtlBtn.querySelector('#rtl-label') || rtlBtn.querySelector('span');
            if (rtlBtnLabel) {
                rtlBtnLabel.textContent = isRTL ? 'RTL' : 'LTR';
            }

            localStorage.setItem('rtl', isRTL ? 'true' : 'false');
        };

        // Initialize RTL from localStorage or default to false
        const savedRTL = localStorage.getItem('rtl') === 'true';
        updateRTL(savedRTL);

        // Add click event listener
        rtlBtn.addEventListener('click', () => {
            const isRTL = htmlElement.getAttribute('dir') === 'rtl';
            updateRTL(!isRTL);
        });
    }

});
