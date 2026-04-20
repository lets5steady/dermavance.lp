export function initPageTop() {
        const btn = document.getElementById('page-top');
        if (!btn) return;
    
        // スクロール量がこの値を超えたらボタンを表示
        const SHOW_THRESHOLD = 300; // px
    
        // 表示・非表示の切り替え
        const toggle = () => {
            const shouldShow = window.scrollY > SHOW_THRESHOLD;
            btn.classList.toggle('is-visible', shouldShow);
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
