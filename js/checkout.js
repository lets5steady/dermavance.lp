/**
 * checkout.js: 購入手続きのバリデーションとボタン制御を統合
 */
export function initCheckout() {
    document.addEventListener('DOMContentLoaded', () => {
        const submitBtn         = document.getElementById('order_submit');
        const checkoutForm      = document.getElementById('checkout_form');
        const selectProductText = document.querySelector('.error_select_product p');
        const userInfoText      = document.querySelector('.error_userinfo p');
        const paymentText       = document.querySelector('.error_payment p');

        // 1. パターン定義
        const patterns = {
            zenkaku:  /^[^\x01-\x7E\xA1-\xDF]+$/,
            kana:     /^[ァ-ヶー]+$/,
            postcode: /^\d{7}$/,
            tel:      /^0\d{9,10}$/,
            email:    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/
        };

        // 2. 必須項目の定義（商品選択・お客様情報でグループ分け）
        const selectProductFields = [
            { id: 'product_color', label: 'カラー' },
            { id: 'product_Qty',   label: '個数' },
            { id: 'wrapping',      label: 'ギフトラッピング' },
        ];
        const userInfoFields = [
            { id: 'last_name',       pattern: patterns.zenkaku,  label: 'お名前（姓）' },
            { id: 'first_name',      pattern: patterns.zenkaku,  label: 'お名前（名）' },
            { id: 'last_name_kana',  pattern: patterns.kana,     label: 'フリガナ（姓）' },
            { id: 'first_name_kana', pattern: patterns.kana,     label: 'フリガナ（名）' },
            { id: 'postcode',        pattern: patterns.postcode, label: '郵便番号' },
            { id: 'pref',            label: '都道府県' },
            { id: 'city',            pattern: patterns.zenkaku,  label: '市区町村番地' },
            { id: 'tel',             pattern: patterns.tel,      label: '電話番号' },
            { id: 'email',           pattern: patterns.email,    label: 'メールアドレス' },
        ];

        // 3. フィールド群をバリデートして未入力ラベルの配列を返す共通関数
        const validateFields = (fields) => {
            const missing = [];
            fields.forEach(({ id, pattern, label }) => {
                const field = document.getElementById(id);
                if (!field) return;
                const value   = field.value.trim();
                const isValid = value !== '' && (!pattern || pattern.test(value));
                field.classList.toggle('input-error', !isValid);
                if (!isValid) missing.push(label);
            });
            return missing;
        };

        // 4. バリデーション結果をもとにUIを更新する関数
        const updateUI = () => {
            const selectMissing     = validateFields(selectProductFields);
            const userMissing       = validateFields(userInfoFields);
            const isPaymentSelected = Array.from(
                document.getElementsByName('payment')
            ).some(r => r.checked);

            if (selectProductText) {
                selectProductText.innerHTML = selectMissing.length > 0
                    ? `以下の項目を選択してください：<br>・${selectMissing.join('<br>・')}`
                    : '商品の選択が完了しました。';
            }
            if (userInfoText) {
                userInfoText.innerHTML = userMissing.length > 0
                    ? `以下の項目を正しく入力してください：<br>・${userMissing.join('<br>・')}`
                    : 'お客様情報の入力が完了しました。';
            }
            if (paymentText) {
                paymentText.textContent = isPaymentSelected
                    ? 'お支払い方法が選択されています。'
                    : 'お支払い方法を選択してください。';
            }

            const canSubmit = selectMissing.length === 0
                           && userMissing.length === 0
                           && isPaymentSelected;
            if (submitBtn) {
                submitBtn.disabled = !canSubmit;
                submitBtn.classList.toggle('is-disabled', !canSubmit);
            }

            return canSubmit;
        };

        // 5. 入力イベントリスナー
        [...selectProductFields, ...userInfoFields].forEach(({ id }) => {
            const field = document.getElementById(id);
            field?.addEventListener('input',  updateUI);
            field?.addEventListener('change', updateUI);
        });
        document.getElementsByName('payment').forEach(radio => {
            radio.addEventListener('change', updateUI);
        });

        // 6. submit イベント（全条件通過時のみアラート）
        checkoutForm?.addEventListener('submit', e => {
            e.preventDefault();
            if (updateUI()) {
                alert('ご注文が完了しました。\nご購入ありがとうございます。\n確認メールをお送りしますのでご確認ください。');
            }
        });

        // 7. 初期状態を反映
        updateUI();
    });
}