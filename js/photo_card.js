"use strict";

import { ripple } from "../utils/ripple.js";

// create photo card

export const photoCard = photo => {

  const root = window.location.origin;

  const {
    alt,
    avg_color: background,
    width,
    height,
    id,
    src: { large }
  } = photo;

  const $card = document.createElement("div");
  $card.classList.add("card", "grid-item");
  $card.style.backgroundColor = background;

  $card.innerHTML = `
    <figure class="card-banner" style="--width: ${width}; --height: ${height};">
      <img src="${large}" alt="${alt}" width="${width}" height="${height}" loading="lazy" class="img-cover">
    </figure>

    <div class="card-content">
      <button class="icon-btn small " aria-label="Add to favorite" data-ripple data-toggle-btn>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
        <div class="state-layer"></div>
      </button>
    </div>

    <a href="${root}/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
  `;

  const $cardBanner = $card.querySelector("img");
  $cardBanner.style.opacity = 0;

  $cardBanner.addEventListener("load", function () {
    this.animate({
      opacity: 1
    }, { duration: 400, fill: "forwards" });
  });

  const $rippleElems = [$card, $card.querySelector("[data-ripple]")];

  $rippleElems.forEach($rippleElem => ripple($rippleElem));

  return $card;
}