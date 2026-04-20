import { setupModule } from './utils.js';

export const initModal = () => {
  /* モーダル */
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
};