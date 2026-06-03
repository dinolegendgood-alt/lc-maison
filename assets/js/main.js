document.addEventListener('DOMContentLoaded', () => {
    // Menu Logic
    const menuTrigger = document.getElementById('menuTrigger');
    const overlayMenu = document.getElementById('overlayMenu');
    const menuLinks = document.querySelectorAll('.menu-links a');

    if (menuTrigger && overlayMenu) {
        menuTrigger.addEventListener('click', () => {
            overlayMenu.classList.toggle('active');
            menuTrigger.classList.toggle('active');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlayMenu.classList.remove('active');
                menuTrigger.classList.remove('active');
            });
        });
    }

    // Scroll Reveals
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // Page Transition effect (simple fade)
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1)';
    window.setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
