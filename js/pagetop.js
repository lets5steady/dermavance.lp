export function initPageTop() {
    const btn = document.getElementById('page-top-btn');
    if (!btn) return;

    const SHOW_THRESHOLD = 300; // px：この値を超えたらボタンを表示

    const toggle = () => {
        btn.classList.toggle('is-visible', window.scrollY > SHOW_THRESHOLD);
    };

    // scroll イベントを間引く（パフォーマンス対策）
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                toggle();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // クリックでトップへスムーズスクロール
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 初期チェック（リロード時にすでに下にいる場合の対応）
    toggle();
}
