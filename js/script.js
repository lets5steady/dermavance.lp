// 共通の安全なイベント登録関数
const setupModule = (selector, callback) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    callback(elements);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM読み込み完了"); // これがコンソールに出るか確認

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

  // --- 3. スライダー関連 (エラー対策済み) ---
  const slider = document.getElementById('slider');
  if (slider) {
    const dots = document.querySelectorAll('.dot');
    slider.addEventListener('scroll', () => {
      const index = Math.round(slider.scrollLeft / slider.clientWidth);
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    });
    // ...その他のスライダー処理もここ（ifの中）に入れる...
  }
});