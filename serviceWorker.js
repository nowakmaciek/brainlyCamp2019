/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [];
// var precacheConfig = [["css/components.css","00c2add60ce57c19cf492c0f3f3ffda7"],["css/normalize.css","4951cc88307c632cf285d3ba988ab283"],["css/summercamp2018.css","21abdeda89ca957ba7a30d976c6a4676"],["fonts/Mark-Simonson---Proxima-Nova-Black.otf","16b61f2409ed004104dbc7b91c77cdba"],["fonts/Mark-Simonson---Proxima-Nova-Bold.otf","64108d01d82379518f4f6109f89935d3"],["fonts/Mark-Simonson---Proxima-Nova-Extrabold.otf","64048d3ff64db18d8fa2cfa3edde70cc"],["fonts/Mark-Simonson---Proxima-Nova-Light.otf","a2827378da9ad28c837f3de79eac5b1b"],["fonts/Mark-Simonson---Proxima-Nova-Medium.otf","f8b1536b054f344d8100558efe77926e"],["fonts/Mark-Simonson---Proxima-Nova-Semibold.otf","e3bb53aaab0f91ee168070d29c551340"],["fonts/Mark-Simonson---Proxima-Nova-Thin.otf","96f856aaf502fe5b2622ac48c6a6f810"],["fonts/Mark-Simonson---Proxima-Nova.otf","29746ad79f6aae5fc2c819002b202962"],["images/Acitivity-free-1.png","c6f28be9b3d570a14d0893cdd821c0aa"],["images/Acitivity-free-2.png","4c30b0f4bc2a7e4faa8cb3b847ccd5f0"],["images/Acitivity-free-3.png","701a9efac605902a75c61b5acf675c51"],["images/Activity-paid-1-p-500.png","4d2994398512fe2746e84af00aeceb66"],["images/Activity-paid-1.png","1b42c1e77ee812fc54f4305a757d29c4"],["images/Activity-paid-10.png","b12ed206ba362fd1f66a13c289b89f66"],["images/Activity-paid-11.png","c29bd3c40e3c13177bb3844779cd63e5"],["images/Activity-paid-12.png","f9a312f58a702262fdc2cf4a6903de83"],["images/Activity-paid-13.png","0f7ec4d24550792b7324aa25ad38d8e5"],["images/Activity-paid-14.png","538e5ac9afa7b4a0de09b8c60c0759ef"],["images/Activity-paid-2.png","cd4a0d17fcb51ec807f9a369ea692891"],["images/Activity-paid-3.png","cf8cafa9e19cf4c4812d59525b2f5781"],["images/Activity-paid-4.png","cd1cd417327453bafc5d2025575da52a"],["images/Activity-paid-5.png","bb6bb4a866ff715c1a9adf261c365a4e"],["images/Activity-paid-6.png","8c9f0fc0ab9a43f2e86fb0ba9f0c6724"],["images/Activity-paid-7.png","ea851de3ed5d9466ee5ea77ffc2d924f"],["images/Activity-paid-8.png","3c176fe846126952ac7dd6639e816064"],["images/Activity-paid-9.png","bdaf776d32509a0d099bb7a4ed2ccd74"],["images/Close.svg","a3ffd7502bf134b0d4c3fa53dfbe78a1"],["images/Close_1.svg","e5e2187993e2a064b7e0d84e0a07158a"],["images/activity-box-image-placeholder.png","f93985c1f664b12b80eccb9f1298214b"],["images/add-to-home-screen.svg","195b7fc28ae8b33f0c3a8412b0c024e0"],["images/arrow.svg","9cfb6fa54c3d35b6c9216d220c17606b"],["images/avatar-1-p-500.png","4e02997ea7ad8a153680604cf91a5974"],["images/avatar-1.png","25e989e5719b58885ac48fa91fdc7183"],["images/avatar-2.png","6c2f6e341073f6bc7f0a53271776b8c0"],["images/avatar-3.png","175c3431ae794bb42f8459dc7cb90243"],["images/avatar-4.png","377a2bd5ebe1df5fb48c8618e8fc40a1"],["images/avatar-5.png","e4f4f0d194639776434fcae95195fe6f"],["images/body-1.svg","9a15fb0ab0c45fa5bf3c3209ca41128c"],["images/body-2.svg","ee26b4507f4aaf86b903c8e12eebeb1f"],["images/body-3.svg","e5212a8bbdd8253f52930a3c3729ca71"],["images/brainly-fav.png","2253d2a6225086741f06a916ac56b207"],["images/concierge.svg","1a4ea19355f55aa369984eaccc860337"],["images/contact-avatar-1.png","d85f68ad2323f85194e554273571522e"],["images/contact-avatar-2.png","4b281e51fe37ff7915f5b4882701ec3e"],["images/feedback.svg","6c441ec5e517ca12ff9b5615c5412f5b"],["images/flag.svg","c319725ec4355818f72c15d42e93998d"],["images/icon-192.png","6f6a0f3e5d44f024c2cefe2bfcee421d"],["images/icon-256.png","437793755674ac9392961f0cf97753bd"],["images/icon-512.png","48f6aab83eb98ad3cf385139b0852ff1"],["images/icon-swimming.svg","708001ebac23c514bb87d0b4f239f6ac"],["images/integration-1.svg","f3ec71487aba4a993fdaebb81f0411c1"],["images/integration-2.svg","9c725ae671d56ea75b0c822fdfbfceac"],["images/integration-3.svg","15bf49eb39b13c9b6508ffda2b566846"],["images/lock.svg","b213b852fc9842f945c21ae81ce8cd4e"],["images/map.svg","1abf44f0f0f478fc4afeb1d935c35429"],["images/minus2-floor.svg","26ac2b71a57796971a0ddc378dc96886"],["images/phone.svg","47e876884afc75ffad7c1e7daf3d2225"],["images/pin.svg","b8b01ddc843e72b7ab0ccabbfe82064d"],["images/sheets.svg","9ce0d4ee4ca345d0249f59bdb232219f"],["images/sheets_1.svg","a71929225c26bfe2ddb2842970b3bc01"],["images/slack.png","9baafb15cb30d4a890490d9ecd78e01b"],["images/summercamp-background.svg","a089c5b14f34646af64721bf8a0cc712"],["images/summercamp-bit.svg","f5ad9a47ac6eb41becb86869fad4cf34"],["images/summercamp-brainly.svg","2dbd35f45684ac5bc733c261a1d9f09e"],["images/tab-bar-icon-1.svg","47052b4da0bc081038851193bf84962d"],["images/tab-bar-icon-2.svg","aae1b9c655131ddc8d949e4d9562d2d8"],["images/tab-bar-icon-3.svg","a04f53137e7f04c0069cf5ddf32bd363"],["images/teams.svg","4336afcf3fb11a59440b7dbd3b1c9e06"],["index.html","3325dcb8f85f7423096446d4ceb34e11"],["js/jquery-3.3.1.min.js","a09e13ee94d51c524b7e2a728c7d4039"],["js/main_index.js","795301f343f06f96f2bf4aa4c81f4aeb"],["js/main_scamp.js","2ff3af3a62d977e59f83b97357c00710"],["js/summercamp2018.js","d4b46efbc7477ae4923f82f7ef037a25"],["manifest.json","9989c77f634729c83d13cf8a435061f1"],["summercamp.html","3f2b55c7a1dcda8c6cccbb45053b9495"]];
var cacheName = 'sw-precache-v4--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







