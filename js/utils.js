// 共通の安全なイベント登録関数
export const setupModule = (selector, callback) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    callback(elements);
  }
};

/* header_naviの下のactive line */
export const initHeaderNav = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. 現在のページのURL（ファイル名）を取得
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    // 2. ナビゲーション内のすべてのリンクを取得
    const navLinks = document.querySelectorAll(".header_navi a");

    navLinks.forEach(link => {
    // 3. リンクのhref属性を取得
      const href = link.getAttribute("href");
    // 4. 現在のURLとhrefが一致したらクラスを付与
      if (currentPath === href) {
        link.classList.add("is-active");
      }
    });
  });
};