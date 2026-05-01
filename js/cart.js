export const initCart = () => {
    /* 翌々日のDateオブジェクトを返す共通関数 */
    const getTwoDaysLater = () => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        return date;
    };

    /* 購入ページの最短お届け可能日表示 */
    document.addEventListener('DOMContentLoaded', () => {
        const earliest_delivery_date = document.querySelector('.earliest_delivery_date');
        if (!earliest_delivery_date) return;

        const date = getTwoDaysLater();
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        earliest_delivery_date.textContent =
            `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${days[date.getDay()]})`;
    });

    /* 購入手続きページのお届け希望日選択 */
    document.addEventListener('DOMContentLoaded', () => {
        const dateInput = document.getElementById('input_date');
        if (!dateInput) return;

        const date = getTwoDaysLater();
        const yyyy = date.getFullYear();
        const mm   = String(date.getMonth() + 1).padStart(2, '0');
        const dd   = String(date.getDate()).padStart(2, '0');
        const minDate = `${yyyy}-${mm}-${dd}`;

        dateInput.value = minDate;
        dateInput.min   = minDate;
    });

    /* 購入手続きページの商品合計金額計算 */
    document.addEventListener('DOMContentLoaded', () => {
        const qtySelect = document.getElementById('product_Qty');
        if (!qtySelect) return;

        const subTotalDisplay    = document.getElementById('res_sub_total');
        const shippingDisplay    = document.getElementById('res_shipping');
        const totalAmountDisplay = document.getElementById('res_total_amount');
        if (!subTotalDisplay || !shippingDisplay || !totalAmountDisplay) return;

        const UNIT_PRICE   = 505000;
        const SHIPPING_FEE = 0;

        const updateCalculations = () => {
            const qty        = parseInt(qtySelect.value) || 0;
            const subTotal   = UNIT_PRICE * qty;
            const totalAmount = subTotal + SHIPPING_FEE;

            subTotalDisplay.textContent    = subTotal.toLocaleString();
            shippingDisplay.textContent    = SHIPPING_FEE.toLocaleString();
            totalAmountDisplay.textContent = totalAmount.toLocaleString();
        };

        qtySelect.addEventListener('change', updateCalculations);
    });
};