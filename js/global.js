"use strict";

import { addEventOnElements } from "../utils/handleEvent.js";
import { ripple } from "../utils/ripple.js";

//header 0n-scrolls

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

// add ripple

const $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));

// navbar toggle for mobile screen

const $navTogglers = document.querySelectorAll("[data-nav-toggler]");
const $navbar = document.querySelector("[data-navigation]");
const $scrim = document.querySelector("[data-scrim]");

addEventOnElements($navTogglers, "click", function () {
  $navbar.classList.toggle("show");
  $scrim.classList.toggle("active");
})

// filter functionality

window.filterObj = {};

// initial favorite object in local storage

if (!window.localStorage.getItem("favorite")) {
  const favoriteObj = {
    photos: {},
    videos: {}
  }

  window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}