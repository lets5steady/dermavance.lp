// 共通の安全なイベント登録関数
const setupModule = (selector, callback) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    callback(elements);
  }
};


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


// --- 1. モーダルを開く処理 ---
setupModule('.modal-open', (buttons) => {
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log("クリックされました:", e.target);
      const targetId = button.getAttribute('data-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.showModal();
      } else {
        console.error("対象のモーダルが見つかりません:", targetId);
      }
    });
  });
});

// --- 2. モーダルを閉じる処理 ---
setupModule('.modal-unit', (modals) => {
  modals.forEach(modal => {
    // 内部ボタンで閉じる
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.close());
    }
    // 背景クリックで閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  });
});


//スライダーの下のインジケーター
const slider = document.getElementById('slider');

// --- sliderが存在する場合のみ、以下の設定がすべて有効になる ---
if (slider) {
  const dots = document.querySelectorAll('.dot');
  const colorOptions = document.querySelectorAll('.color-option');

// 1. スクロール監視
// 現在のスクロール位置から、何枚目の画像か計算
slider.addEventListener('scroll', () => {
  const index = Math.round(slider.scrollLeft / slider.clientWidth);
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
});

// 2. ドットクリックで移動
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slider.scrollTo({ left: slider.clientWidth * i, behavior: 'smooth' });
    });
  });

// 3. キーボード操作（windowに対して登録するが、ここにあれば安全）
window.addEventListener('keydown', (e) => {
  const step = slider.clientWidth; // 1回で動く距離（画像1枚分）
  if (e.key === 'ArrowRight') slider.scrollBy({ left: step, behavior: 'smooth' });// 右矢印で次へ
  if (e.key === 'ArrowLeft') slider.scrollBy({ left: -step, behavior: 'smooth' });// 左矢印で前へ
});

// 4. カラーオプション
// カラーボタンのスタイル（白い円）を更新
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    colorOptions.forEach(opt => opt.classList.remove('is-active'));
    option.classList.add('is-active');
//指定されたインデックス（0番目や3番目）を取得
    const index = parseInt(option.getAttribute('data-color-index'));
//スライダーをその画像まで移動
// ※既存のドットクリックと同じロジックが使えます
    slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
  });
});

// 5. 初期状態：最初の色を選択状態にしておく（任意）
// 要素が存在すればaddし、なければ何もしない（エラーにならない）
  colorOptions[0]?.classList.add('is-active');
}