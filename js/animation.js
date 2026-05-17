export const initAnimations = () => {
    // type="module"はdefer相当のため、呼び出し時点でDOMは構築済み

    // Intersection Observer（フェードアップ）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.js-fade-in').forEach(el => observer.observe(el));
};