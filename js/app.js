"use strict";

import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";

// render curated photos in home page

const $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({ page: 1, pre_page: 15 }, data => {
  $photoGrid.innerHTML = "";

  data.photos.forEach(photo => {
    const $photocard = photoCard(photo);

    $photoGrid.appendChild($photocard);
  })
});