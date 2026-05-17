// ヘッダーナビのアクティブライン制御
// type="module" は defer 相当のため、呼び出し時点でDOMは構築済み
export const initHeaderNav = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-header__nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('site-header__nav-link--active');
        }
    });
};