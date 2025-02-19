"use strict";

import { ripple } from "../utils/ripple.js";
import { addEventOnElements } from "../utils/event.js";
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

console.log(searchType)

segment($searchSegment, segmentValue => window.searchType = segmentValue);