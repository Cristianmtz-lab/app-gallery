"use strict";

import { API_KEY } from '../env.js';
import { urlEncode } from '../utils/urlEncode.js';

const headers = new Headers();
headers.append("Authorization", API_KEY);

const requestOptions = { headers };

const fetchData = async function (url, successCallback) {
  const response = await fetch(url, requestOptions);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }
}

let requesUrl = "";

const root = {
  default: "https://api.pexels.com/v1/",
  videos: "https://api.pexels.com/videos/"
}

export const client = {
  photos: {
    search(parameters, callback) {
      requesUrl = `${root.default}search?${urlEncode(parameters)}`;
      fetchData(requesUrl, callback);
    },

    curated(parameters, callback) {
      fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
    },
    detail(id, callback) {
      fetchData(`${root.default}photos/${id}`, callback);
    }
  },
  videos: {
    search(parameters, callback) {
      requesUrl = `${root.videos}search?${urlEncode(parameters)}`;
      fetchData(requesUrl, callback);
    },

    popular(parameters, callback) {
      fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
    },
    detail(id, callback) {
      fetchData(`${root.videos}videos/${id}`, callback);
    }
  },
  collections: {
    featured(parameters, callback) {
      requesUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
      fetchData(requesUrl, callback);
    },
    detail(id, parameters, callback) {
      requesUrl = `${root.default}collections/${id}?${urlEncode(parameters)}`;
      fetchData(requesUrl, callback);
    }
  },
}