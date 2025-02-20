"use strict";

export const updateurl = (filterObj, searchType) => {
  setTimeout(() => {
    const root = window.location.origin;
    console.log(filterObj);
    console.log(searchType)
    const searchQuery = urlEncode(filterObj);
  })
}