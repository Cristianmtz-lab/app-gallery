"use strict";

export function addEventOnElements($elements, eventType, callback) {
  $elements.forEach($element => $element.addEventListener(eventType, callback));
}