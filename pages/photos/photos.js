" use strict";

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateurl } from "../../utils/updateUrl.js";
import { urlDecode } from "../../utils/urlDecode.js";
import { filter } from "../../js/filter.js";

// show filter bar if seaarch anything
const $filterBar = document.querySelector("[data-filter-bar]");
$filterBar.style.display = window.location.search ? "flex" : "none";

// init filter 
const $filterWrappers = document.querySelectorAll("[data-filter]");
$filterWrappers.forEach($filterWrapper => {

  filter($filterWrapper, window.filterObj, (newObj) => {
    window.filterObj = newObj;
    updateurl(newObj, "photos");
  });
});

// render curated or searched photos

const $photoGrid = document.querySelector("[data-photo-grid]");
const $title = document.querySelector("[data-title]");
const photoGrid = gridInit($photoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} photos` : "Curated photos";

$title.textContent = title;
document.title = title;

// render all photos 

const renderPhotos = function (currentPage) {

  client.photos[searchObj ? "search" : "curated"]({ ...searchObj, per_page: perPage, page: currentPage }, data => {

    totalPage = Math.ceil(data.total_results / perPage);

    data.photos.forEach(photo => {
      const $photoCard = photoCard(photo);

      updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
    });

    // when photos loaded
    isLoaded = true;

    // when no more photo found, hide loader
    if (currentPage >= totalPage) $loader.style.display = "none";
  });
}

renderPhotos(currentPage);

// load more photos 

const $loader = document.querySelector("[data-loader]");
let isLoaded = true;

window.addEventListener("scroll", function () {

  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {

    currentPage++;
    renderPhotos(currentPage);
    isLoaded = false;

  }
});