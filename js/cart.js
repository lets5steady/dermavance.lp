export const initCart = () => {
    const getTwoDaysLater = () => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        return date;
    };

    // 購入ページの最短お届け可能日表示
    const deliveryEl = document.querySelector('.earliest-delivery-date');
    if (deliveryEl) {
        const date = getTwoDaysLater();
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        deliveryEl.textContent =
            `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${days[date.getDay()]})`;
    }

    // 購入手続きページのお届け希望日選択
    const dateInput = document.getElementById('input-date');
    if (dateInput) {
        const date = getTwoDaysLater();
        const yyyy = date.getFullYear();
        const mm   = String(date.getMonth() + 1).padStart(2, '0');
        const dd   = String(date.getDate()).padStart(2, '0');
        const minDate = `${yyyy}-${mm}-${dd}`;
        dateInput.value = minDate;
        dateInput.min   = minDate;
    }

    // 購入手続きページの商品合計金額計算
    const qtySelect = document.getElementById('product-qty');
    if (qtySelect) {
        const subTotalDisplay    = document.getElementById('res-subtotal');
        const shippingDisplay    = document.getElementById('res-shipping');
        const totalAmountDisplay = document.getElementById('res-total');
        if (subTotalDisplay && shippingDisplay && totalAmountDisplay) {
            const UNIT_PRICE   = 505000;
            const SHIPPING_FEE = 0;
            const updateCalculations = () => {
                const qty         = parseInt(qtySelect.value) || 0;
                const subTotal    = UNIT_PRICE * qty;
                const totalAmount = subTotal + SHIPPING_FEE;
                subTotalDisplay.textContent    = subTotal.toLocaleString();
                shippingDisplay.textContent    = SHIPPING_FEE.toLocaleString();
                totalAmountDisplay.textContent = totalAmount.toLocaleString();
            };
            qtySelect.addEventListener('change', updateCalculations);
        }
    }
};