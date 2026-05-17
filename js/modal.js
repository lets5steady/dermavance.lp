import { setupModule } from './utils.js';

export const initModal = () => {
    // モーダルを開く
    setupModule('.modal__trigger', (buttons) => {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.getElementById(button.getAttribute('data-target'));
                if (modal) modal.showModal();
            });
        });
    });

    // モーダルを閉じる
    setupModule('.modal', (modals) => {
        modals.forEach(modal => {
            // ① 内部ボタン（.modal__close）のクリックで閉じる
            modal.querySelector('.modal__close')?.addEventListener('click', () => modal.close());
            // ② モーダル背景（dialog要素自体）のクリックで閉じる
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.close();
            });
        });
    });
};