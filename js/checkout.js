/**
 * checkout.js: 購入手続きのバリデーションとボタン制御を統合
 */
export function initCheckout() {
    const submitBtn = document.getElementById('order_submit');
    const errorUserInfo = document.querySelector('.error_userinfo');
    const errorPayment = document.querySelector('.error_payment');
    const userInfoText = errorUserInfo?.querySelector('p');
    const paymentText = errorPayment?.querySelector('p');

    // 1. パターン定義
    const patterns = {
        zenkaku: /^[^\x01-\x7E\xA1-\xDF]+$/,
        kana: /^[ァ-ヶー]+$/,
        postcode: /^\d{7}$/,
        tel: /^0\d{9,10}$/,
        email: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/
    };

    // 2. 必須項目の定義（ラベルとパターンをセットに）
    const requiredFields = [
        { id: 'last_name', pattern: patterns.zenkaku, label: 'お名前（姓）' },
        { id: 'first_name', pattern: patterns.zenkaku, label: 'お名前（名）' },
        { id: 'last_name_kana', pattern: patterns.kana, label: 'フリガナ（姓）' },
        { id: 'first_name_kana', pattern: patterns.kana, label: 'フリガナ（名）' },
        { id: 'postcode', pattern: patterns.postcode, label: '郵便番号' },
        { id: 'pref', pattern: null, label: '都道府県' },
        { id: 'city', pattern: patterns.zenkaku, label: '市区町村番地' },
        { id: 'tel', pattern: patterns.tel, label: '電話番号' },
        { id: 'email', pattern: patterns.email, label: 'メールアドレス' }
    ];

    // 3. UI（エラーメッセージとボタン）を更新するメイン関数
    const updateUI = () => {
        let missingFields = [];

        // お客様情報の精査
        requiredFields.forEach(rule => {
            const field = document.getElementById(rule.id);
            const value = field.value.trim();
            const isValid = value !== '' && (!rule.pattern || rule.pattern.test(value));

            if (!isValid) {
                missingFields.push(rule.label);
                field.classList.add('input-error');
            } else {
                field.classList.remove('input-error');
            }
        });

        // 支払い方法の精査
        const paymentMethods = document.getElementsByName('payment');
        const isPaymentSelected = Array.from(paymentMethods).some(r => r.checked);

        // ガイドメッセージの更新（最初から表示）
        if (userInfoText) {
            userInfoText.innerHTML = missingFields.length > 0 
                ? `以下の項目を入力してください：<br>・${missingFields.join('<br>・')}`
                : "お客様情報の入力が完了しました。";
        }

        if (paymentText) {
            paymentText.textContent = isPaymentSelected 
                ? "お支払い方法が選択されています。" 
                : "お支払い方法を選択してください。";
        }

        // ボタンの活性化制御
        const canSubmit = missingFields.length === 0 && isPaymentSelected;
        submitBtn.disabled = !canSubmit;
        submitBtn.classList.toggle('is-disabled', !canSubmit);
    };

    // 4. イベントリスナーの設定
    requiredFields.forEach(rule => {
        const field = document.getElementById(rule.id);
        field?.addEventListener('input', updateUI);
        field?.addEventListener('change', updateUI);
    });

    document.getElementsByName('payment').forEach(radio => {
        radio.addEventListener('change', updateUI);
    });

    // 5. ページ読み込み時に初期状態を反映
    updateUI();
}