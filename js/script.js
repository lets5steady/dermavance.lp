//header_naviの下のactive line
document.addEventListener("DOMContentLoaded", () => {
  // 1. 現在のページのURL（ファイル名）を取得
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // 2. ナビゲーション内のすべてのリンクを取得
  const navLinks = document.querySelectorAll(".header_navi a");

  navLinks.forEach(link => {
    // 3. リンクのhref属性を取得
    const href = link.getAttribute("href");

    // 4. 現在のURLとhrefが一致したらクラスを付与
    if (currentPath === href) {
      link.classList.add("is-active");
    }
  });
});

//スライダーの下のインジケーター
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');

slider.addEventListener('scroll', () => {
  // 現在のスクロール位置から、何枚目の画像か計算
  const index = Math.round(slider.scrollLeft / slider.clientWidth);
  
  // インジケーターの更新
  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
  });
});

// ドットをクリックした時にその画像へ飛ばす処理
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    slider.scrollTo({
      left: slider.clientWidth * i,
      behavior: 'smooth'
    });
  });
});

// キーボード操作の追加
window.addEventListener('keydown', (e) => {
  // スライダー要素が画面内にあるか、または特定の条件（フォーカス等）で判定
  // 今回はシンプルに、左右キーが押されたらスライダーを動かす例です
  
  const step = slider.clientWidth; // 1回で動く距離（画像1枚分）

  if (e.key === 'ArrowRight') {
    // 右矢印で次へ
    slider.scrollBy({ left: step, behavior: 'smooth' });
  } else if (e.key === 'ArrowLeft') {
    // 左矢印で前へ
    slider.scrollBy({ left: -step, behavior: 'smooth' });
  }
});

const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    // 1. カラーボタンのスタイル（白い円）を更新
    colorOptions.forEach(opt => opt.classList.remove('is-active'));
    option.classList.add('is-active');

    // 2. 指定されたインデックス（0番目や3番目）を取得
    const index = parseInt(option.getAttribute('data-color-index'));

    // 3. スライダーをその画像まで移動
    // ※既存のドットクリックと同じロジックが使えます
    slider.scrollTo({
      left: slider.clientWidth * index,
      behavior: 'smooth'
    });
  });
});

// 初期状態：最初の色を選択状態にしておく（任意）
colorOptions[0].classList.add('is-active');