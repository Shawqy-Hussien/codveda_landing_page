
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navbar Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navMenu.classList.add('deactive');
        } else if (navMenu.classList.contains('deactive')) {
            navMenu.classList.remove('deactive');
            navMenu.classList.add('active');
        } else {
            navMenu.classList.add('active');
        }
        // Icon switch
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');

                // Special handling for number counters
                if (entry.target.classList.contains('stat-box')) {
                    startCounter(entry.target.querySelector('h3'));
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-up, .stat-box');
    hiddenElements.forEach(el => observer.observe(el));

    // --- 4. Number Counter Animation ---
    function startCounter(element) {
        const target = +element.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                // Format number (e.g., 50000 -> 50k)
                if (target > 1000) {
                    element.innerText = (current / 1000).toFixed(0) + 'k+';
                } else {
                    element.innerText = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target > 1000) {
                    element.innerText = (target / 1000).toFixed(0) + 'k+';
                } else {
                    element.innerText = target;
                }
            }
        };

        updateCounter();
    }
});