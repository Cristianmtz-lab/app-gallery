"use strict";

import { ripple } from "../utils/ripple.js";

export const collectionCard = collection => {
  const root = window.location.origin;

  const {
    title,
    id,
    media_count
  } = collection;

  const $card = document.createElement("div");
  $card.classList.add("grid-card", "list-item", "two-line");
  $card.setAttribute("title", title);
  $card.dataset.ripple = true;

  const filterObj = JSON.parse(window.localStorage.getItem("favorite"));

  $card.innerHTML = `
    <div>
      <h3 class="body-large">${title}</h3>

      <p class="bady-medium label">${media_count} media</p>
    </div>

    <a href="${root}/pages/collections/collection_detail.html?collectionId=${id}&title=${title}" class="state-layer"></a>
  `;

  ripple($card);

  return $card;

}