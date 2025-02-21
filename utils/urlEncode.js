"use strict";

// Object to url

export const urlEncode = urlObj => {
  return Object.entries(urlObj)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}