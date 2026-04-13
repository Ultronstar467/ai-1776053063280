document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions'); // Select the nav-actions for mobile
    const allNavLinks = document.querySelectorAll('.nav-links a, .nav-actions a.btn'); // All clickable links within the nav

    // Toggle mobile menu
    if (hamburger && navLinks && navActions) { // Ensure elements exist
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navActions.classList.toggle('active'); // Toggle visibility for action buttons too
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times'); // Change icon
        });

        // Close menu when a link is clicked (for smooth scrolling)
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navActions.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Smooth scrolling for internal links (optional, but good UX)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navA_elements = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' from all links
                navA_elements.forEach(link => link.classList.remove('active'));

                // Add 'active' to the link corresponding to the current section
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});