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

const EXLUDE_CATEGORIES = ["陶芸教室・陶芸体験"];

const ads = document.querySelectorAll("li.item-relation-planlist");
ads.forEach((ad) => ad.remove());
const items = document.querySelectorAll("li.item");
items.forEach((item) => {
  const categoryContainer = item.querySelector("p.item-categories");
  if (categoryContainer === null || categoryContainer.textContent === null)
    return;
  const category = categoryContainer.textContent.trim().split("／")[1];
  EXLUDE_CATEGORIES.includes(category) && item.remove();
});
