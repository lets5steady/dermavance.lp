export const initAnimations = () => {
  /* アニメーション */
    document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach(el => observer.observe(el));

        const parallaxElements = document.querySelectorAll('.parallax-target');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(el => {
                const speed = 0.15;
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                const offset = (scrolled - elementTop) * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        }, { passive: true });
    });
    };