export const initCart = () => {
  /* 購入手続きページのお届け希望日選択 */
    window.addEventListener('DOMContentLoaded', () => {
        const dateInput = document.getElementById('input_date');
        if (!dateInput) return;
        
        const date = new Date();
        date.setDate(date.getDate() + 2);
        
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const minDate = `${yyyy}-${mm}-${dd}`;
        
        dateInput.value = minDate;
        dateInput.min = minDate;
    });

    /* 購入手続きページの商品合計金額計算 */
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.forms.select_product;
        if (!form) return;

        const subTotalDisplay = document.getElementById('res_sub_total');
        const shippingDisplay = document.getElementById('res_shipping');
        const totalAmountDisplay = document.getElementById('res_total_amount');

        if (!subTotalDisplay || !shippingDisplay || !totalAmountDisplay) return;

        const UNIT_PRICE = 505000;
        const SHIPPING_FEE = 0;

        const updateCalculations = () => {
            const qty = parseInt(form.product_Qty.value) || 0;
            const subTotal = UNIT_PRICE * qty;
            const totalAmount = subTotal + SHIPPING_FEE;

            subTotalDisplay.textContent = subTotal.toLocaleString();
            shippingDisplay.textContent = SHIPPING_FEE.toLocaleString();
            totalAmountDisplay.textContent = totalAmount.toLocaleString();
        };

        if (form.product_Qty) {
            form.product_Qty.addEventListener('change', updateCalculations);
        }
    });
    };