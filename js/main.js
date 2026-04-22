import { initHeaderNav } from './utils.js';
import { initModal } from './modal.js';
import { initSlider } from './slider.js';
import { initAnimations } from './animation.js';
import { initCart } from './cart.js'; // 商品計算など
import { initCheckout } from './checkout.js'; // ← バリデーションとボタン制御
import { initPageTop } from './pagetop.js'; 

// 各機能の初期化
initHeaderNav();
initModal();
initSlider();
initAnimations();
initCart();
initCheckout();
initPageTop();