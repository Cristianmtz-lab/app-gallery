"use strict";

import { addEventOnElements } from "../utils/handleEvent.js";
import { ripple } from "../utils/ripple.js";
import { updateurl } from "../utils/updateUrl.js";
import { urlDecode } from "../utils/urlDecode.js";
import { segment } from "./segment_btn.js";

// search view toggle in small devies

const $searchTogglers = document.querySelectorAll("[data-search-toggler]");
const $searchView = document.querySelector("[data-search-view]");

addEventOnElements($searchTogglers, "click", () => $searchView.classList.toggle("show"));

//search clear 

const $searchField = document.querySelector("[data-search-field]");
const $searchClearBtn = document.querySelector("[data-search-clear-btn]");

$searchClearBtn.addEventListener("click", () => $searchField.value = "");

// search type

const $searchSegment = document.querySelector("[data-segment='search']");
const $activeSegmentBtn = document.querySelector("[data-segment-btn].selected");
window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, segmentValue => {
  window.searchType = segmentValue
});

// search submit 

const $searchBtn = document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", function () {
  const searchValue = $searchField.value;

  if (searchValue) {
    updateSearchHistory(searchValue);
    window.filterObj.query = searchValue;
    updateurl(window.filterObj, window.searchType);
  }
})

// submit search when press on "Enter" key

$searchField.addEventListener("keydown", e => {
  if (e.key === "Enter" && $searchField.value.trim()) $searchBtn.click();
})

// search history 

// initial search history

let searchHistory = { items: [] };

if (window.localStorage.getItem("search_history")) {
  searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
} else {
  window.localStorage.setItem("search_history", JSON.stringify(searchHistory))
}

// update search history

const updateSearchHistory = searchValue => {
  if (searchHistory.items.includes(searchValue)) {
    searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
  }

  searchHistory.items.unshift(searchValue);

  window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

// render search history items in search list 

const $searchList = document.querySelector("[data-search-list]");
const historyLen = searchHistory.items.length;

for (let i = 0; i < historyLen & i <= 5; i++) {
  const $listItem = document.createElement("button");
  $listItem.classList.add("list-item");
  $listItem.innerHTML = `
      <span class="material-symbols-outlined">history</span>
      <span class="body-large text">${searchHistory.items[i]}</span>
      <div class="state-layer"></div>
  `;

  ripple($listItem);

  $listItem.addEventListener("click", function () {
    $searchField.value = this.children[1].textContent;
    $searchBtn.click();
  })

  $searchList.appendChild($listItem)
}

// show searched value in search after reload

const search = urlDecode(window.location.search.slice(1));
if (search.query) $searchField.value = search.query;