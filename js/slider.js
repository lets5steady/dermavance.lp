//   /* スライダーとカラーオプション */

export const initSlider = () => {
  const slider = document.getElementById('slider');
  if (!slider) return;

  // --- 1. 変数の定義 ---
  const dots = document.querySelectorAll('.dot');
  const colorOptions = document.querySelectorAll('.color-option');
  const colorSelect = document.getElementById('product_color');

  // インデックスとカラー値の紐付けマップ
  const indexToColor = { 0: "Black", 1: "Silver" };
  const colorToIndex = { "Black": 0, "Silver": 1 };

  // --- 2. 各種イベントの登録 ---

  // スクロール監視
  // 現在のスクロール位置から、何枚目の画像か計算
  slider.addEventListener('scroll', () => {
    const index = Math.round(slider.scrollLeft / slider.clientWidth);
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));

    colorOptions.forEach((opt) => {
      const optIndex = parseInt(opt.getAttribute('data-color-index'));
      opt.classList.toggle('is-active', optIndex === index);
    });
    if (colorSelect) {
      colorSelect.value = indexToColor[index] || "";
    }
  });

  // カラーオプション（ボタン）クリック
  // カラーボタンをクリックした時にスライダーを動かす処理
  colorOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      const index = parseInt(opt.getAttribute('data-color-index'));
      slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
    });
  });

  // セレクトボックス変更
  colorSelect?.addEventListener('change', (e) => {
    const selectedColor = e.target.value;
    if (selectedColor in colorToIndex) {
      const index = colorToIndex[selectedColor];
      slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
    }
  });

  // ドットクリックで移動
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slider.scrollTo({ left: slider.clientWidth * i, behavior: 'smooth' });
    });
  });

  // キーボード操作（windowに対して登録するが、ここにあれば安全）
window.addEventListener('keydown', (e) => {
  const step = slider.clientWidth; // 1回で動く距離（画像1枚分）
  if (e.key === 'ArrowRight') slider.scrollBy({ left: step, behavior: 'smooth' });// 右矢印で次へ
  if (e.key === 'ArrowLeft') slider.scrollBy({ left: -step, behavior: 'smooth' });// 左矢印で前へ
});

  // --- 3. 初期状態の設定 ---
  if (colorOptions.length > 0) {
    colorOptions[0].classList.add('is-active');
  }
};