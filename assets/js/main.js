document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu
    const menuTrigger = document.getElementById('menuTrigger');
    const navLinks = document.querySelector('.nav-links');

    if (menuTrigger && navLinks) {
        menuTrigger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuTrigger.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuTrigger.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll Reveal for .reveal-maison
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-maison').forEach(el => observer.observe(el));

    // Page fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
