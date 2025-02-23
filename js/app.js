"use strict";

import { gridInit, updateGrid } from "../utils/masonry_grid.js";
import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";
import { videoCard } from "./video_card.js";

// render curated photos in home page

const $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({ page: 1, pre_page: 15 }, data => {
  $photoGrid.innerHTML = "";
  const photoGrid = gridInit($photoGrid);

  data.photos.forEach(photo => {
    const $photoCard = photoCard(photo);

    updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
  })
});

// render popular videos in home page

const $videoGrid = document.querySelector("[data-video-grid]");

$videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.videos.popular({ pre_page: 20 }, data => {

  $videoGrid.innerHTML = "";
  const videoGrid = gridInit($videoGrid);

  data.videos.forEach(video => {
    const $videoCard = videoCard(video);

    updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
  })
})