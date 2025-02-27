"use strict";

import { client } from '../../js/api_configure.js';
import { gridInit, updateGrid } from '../../utils/masonry_grid.js';
import { photoCard } from '../../js/photo_card.js';
import { videoCard } from '../../js/video_card.js';
import { urlDecode } from '../../utils/urlDecode.js';

// render collection medias 

const $collectionGrid = document.querySelector("[data-collection-grid]");
const $title = document.querySelector("[data-title]");
const collectionGrid = gridInit($collectionGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const collectionObj = urlDecode(window.location.search.slice(1));

$title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;

const loadCollection = function (page) {

  client.collections.detail(collectionObj.collectionId, { per_page: perPage, page: page }, data => {
    console.log(data);

    totalPage = Math.ceil(data.total_results / perPage);

    data.media.forEach(item => {
      let $card;

      switch (item.type.toLowerCase()) {
        case "photo":
          $card = photoCard(item);
          break;
        case "video":
          $card = videoCard(item);
          break;
      }

      updateGrid($card, collectionGrid.columnsHeight, collectionGrid.$columns);

      // when photos loaded
      isLoaded = true;

      // when no more photo found, hide loader 
      if (currentPage >= totalPage) $loader.style.display = "none";
    });
  });
}

loadCollection(currentPage);

// load more photos 

const $loader = document.querySelector("[data-loader]");
let isLoaded = true;

window.addEventListener("scroll", function () {

  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {
    currentPage++;
    loadCollection(currentPage);
    isLoaded = false;
  }
});