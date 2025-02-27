" use strict";

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../utils/masonry_grid.js";
import { videoCard } from "../../js/video_card.js";
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
    updateurl(newObj, "videos");
  });
});

// render popular or searched videos

const $videosGrid = document.querySelector("[data-video-grid]");
const $title = document.querySelector("[data-title]");
const videoGrid = gridInit($videosGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} videos` : "Popular videos";

$title.textContent = title;
document.title = title;

// render all videos 

const renderVideos = function (currentPage) {

  client.videos[searchObj ? "search" : "popular"]({ ...searchObj, per_page: perPage, page: currentPage }, data => {

    totalPage = Math.ceil(data.total_results / perPage);

    data.videos.forEach(video => {
      const $videoCard = videoCard(video);

      updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
    });

    // when videos loaded
    isLoaded = true;

    // when no more video found, hide loader
    if (currentPage >= totalPage) $loader.style.display = "none";
  });
}

renderVideos(currentPage);

// load more videos 

const $loader = document.querySelector("[data-loader]");
let isLoaded = true;

const loadMore = function () {
  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {
    currentPage++;
    renderVideos(currentPage);
    isLoaded = false;
    if (currentPage >= totalPage) $loader.style.display = "none";
  }
}

window.addEventListener("scroll", loadMore);