// ==UserScript==
// @name         jalan-filter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.jalan.net/kankou/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        none
// ==/UserScript==

/** これ未満の観光地を非表示にする */
const MIN_RATING = 3.8;

const EXLUDE_CATEGORIES = [
  "陶芸教室・陶芸体験",
  "香水作り",
  "バイキング・ビュッフェ・ホテルレストラン",
  "スキューバダイビング",
  "アクセサリー作り",
  "その他クラフト・工芸",
  "日帰り温泉",
  "乗馬",
  "BBQ/バーベキュー",
  "日本文化",
  "染色・染物体験",
  "その他レジャー・体験",
  "ラフティング",
  "沢下り(キャニオニング)",
  "着物・浴衣レンタル・着付け体験",
  "ガラス細工作り",
  "その他風呂・スパ・サロン",
  "郷土芸能・伝統芸能",
  "その他ショッピング",
  "茶道教室・茶道体験",
  "ショッピングセンター",
  "町めぐり・食べ歩き",
  "動物カフェ",
  "調香",
  "彫金教室・彫金体験",
  "ハーバリウム",
  "石鹸作り",
  "食品サンプル製作",
  "フラワーアレンジメント・ガーデニング",
  "ポーセラーツサロン・ポーセリンアート",
  "スポーツリゾート施設",
  "レンタカー",
  "和菓子作り",
  "レザークラフト",
  "クルーズ・クルージング",
  "人力車",
  "伝統工芸",
  "忍者・侍・武士体験",
  "いちご狩り",
  "キャンドル作り(アロマキャンドル等)",
];
const ads = document.querySelectorAll("li.item-relation-planlist");
ads.forEach((ad) => ad.remove());
const items = document.querySelectorAll("li.item");
items.forEach((item) => {
  // 平均評価をチェック
  parseFloat(item.querySelector("span.reviewPoint")?.textContent ?? "5") <
    MIN_RATING && item.remove();
  // 除外カテゴリに該当するかチェック
  const categoryContainer = item.querySelector("p.item-categories");
  if (categoryContainer === null || categoryContainer.textContent === null)
    return;
  const category = categoryContainer.textContent.trim().split("／")[1];
  EXLUDE_CATEGORIES.some((exludeCategory) =>
    category.includes(exludeCategory),
  ) && item.remove();
});
