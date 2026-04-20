export const initSlider = () => {
  /* スライダーとカラーオプション */
  const slider = document.getElementById('slider');

  if (slider) {
    const dots = document.querySelectorAll('.dot');
    const colorOptions = document.querySelectorAll('.color-option');
    const colorSelect = document.getElementById('product_color');

    // インデックスとカラー値の紐付けマップ
    const indexToColor = { 0: "Black", 1: "Silver" };
    const colorToIndex = { "Black": 0, "Silver": 1 };

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

    // カラーボタンをクリックした時にスライダーを動かす処理
    colorOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        const index = parseInt(opt.getAttribute('data-color-index'));
        slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
      });
    });

    colorSelect?.addEventListener('change', (e) => {
      const selectedColor = e.target.value;
      if (selectedColor in colorToIndex) {
        const index = colorToIndex[selectedColor];
        slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
      }
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        slider.scrollTo({ left: slider.clientWidth * i, behavior: 'smooth' });
      });
    });
  }
};

//今後の修正：カラーオプションのデフォルトで黒が選択されてるようにする