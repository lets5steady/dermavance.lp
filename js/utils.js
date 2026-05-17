// 共通の安全なイベント登録関数
export const setupModule = (selector, callback) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        callback(elements);
    }
};
