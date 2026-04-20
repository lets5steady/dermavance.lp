export const initAnimations = () => {
  /* アニメーション */
    document.addEventListener('DOMContentLoaded', () => {

        // Intersection Observer (フェードアップ) 
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

        // アニメーションさせたい要素をすべて取得
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach(el => observer.observe(el));

        //  Simple Parallax (パララックス) 
        const parallaxElements = document.querySelectorAll('.parallax-target');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(el => {
                // 速度調整
                const speed = 0.15;
                // 要素の位置を取得
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                // スクロールに合わせて位置をずらす計算
                const offset = (scrolled - elementTop) * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        }, { passive: true });// パフォーマンス向上のためのオプション
    });
    };