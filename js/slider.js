export const initSlider = () => {
    const slider = document.getElementById('slider');
    if (!slider) return;

    // --- 1. 変数の定義 ---
    const dots         = document.querySelectorAll('.product-carousel__dot');
    const colorOptions = document.querySelectorAll('.product-carousel__color-option');
    const colorSelect  = document.getElementById('product-color');

    const indexToColor = { 0: 'Black', 1: 'Silver' };
    const colorToIndex = { 'Black': 0, 'Silver': 1 };

    // --- 2. 各種イベントの登録 ---

    // スクロール監視：現在のスクロール位置から何枚目の画像か計算
    slider.addEventListener('scroll', () => {
        const index = Math.round(slider.scrollLeft / slider.clientWidth);

        dots.forEach((dot, i) =>
            dot.classList.toggle('product-carousel__dot--active', i === index)
        );
        colorOptions.forEach(opt => {
            const optIndex = parseInt(opt.getAttribute('data-color-index'));
            opt.classList.toggle('product-carousel__color-option--active', optIndex === index); 
        });
        if (colorSelect) {
            colorSelect.value = indexToColor[index] || '';
        }
    });

    // カラーオプションクリック：スライダーを該当位置へ移動
    colorOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const index = parseInt(opt.getAttribute('data-color-index'));
            slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
        });
    });

    // セレクトボックス変更
    colorSelect?.addEventListener('change', e => {
        const index = colorToIndex[e.target.value];
        if (index !== undefined) {
            slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
        }
    });

    // ドットクリックで移動
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            slider.scrollTo({ left: slider.clientWidth * i, behavior: 'smooth' });
        });
    });

    // キーボード操作
    window.addEventListener('keydown', e => {
        const step = slider.clientWidth;
        if (e.key === 'ArrowRight') slider.scrollBy({ left:  step, behavior: 'smooth' });
        if (e.key === 'ArrowLeft')  slider.scrollBy({ left: -step, behavior: 'smooth' });
    });

    // --- 3. 初期状態の設定 ---
    colorOptions[0]?.classList.add('product-carousel__color-option--active');
};


