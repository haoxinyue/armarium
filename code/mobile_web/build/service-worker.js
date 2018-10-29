"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","3a24b19d094833a5483d37334baefbbf"],["static/css/main.c1c18d04.css","e9acecac828a9248a2047100e6262402"],["static/js/0.245da395.chunk.js","910518f52eb175e028166e164c5c3f89"],["static/js/1.88315fa2.chunk.js","affa7b0c4869bb99302fcaba01d3e4b1"],["static/js/10.d7a85ba1.chunk.js","ef8f9cfaac52110058a2928f3b65a9ef"],["static/js/11.ff87d36c.chunk.js","38640199d7614351a18ab4afaa0901eb"],["static/js/12.d7d3b364.chunk.js","714c813e43864c217f8455a62ae55298"],["static/js/13.8e8a1caa.chunk.js","b148a660b711913778b10ebaa1efa3ee"],["static/js/14.3576a601.chunk.js","3c81f099bf13ea5dec240a26ef014ef0"],["static/js/15.87c74fb2.chunk.js","069b2a9111021845115ee9bcd5519da7"],["static/js/16.b905346a.chunk.js","a3b44420c22236823b94dfe483fc532e"],["static/js/17.b1e8221b.chunk.js","8800df8940c85190072094118eb3ab1e"],["static/js/18.dfeda6dd.chunk.js","5fd3946c68855bfec2d7dae53d6a43b1"],["static/js/19.fde57eb3.chunk.js","ee31f3891f260ffb92e0f9bea397abb9"],["static/js/2.4a82b737.chunk.js","b5ab8f041b37f50cf27d025d66b3e633"],["static/js/20.8e28ad39.chunk.js","30060a64913d7cd308f21c3bf9a7b82e"],["static/js/21.594fc04a.chunk.js","b1d845e04f5e3ea1a12343fa5d84a148"],["static/js/22.58444f05.chunk.js","2a2ff972d8aa635cb6a002182af060d4"],["static/js/23.bbce228c.chunk.js","2e6313ec82800abcdb05867504479e7b"],["static/js/24.a70296c0.chunk.js","35286201e6f9a2497251f5e10aa5e73d"],["static/js/25.591273df.chunk.js","a6b963c1dfb2c264a0f348e014237f23"],["static/js/3.1fdd6988.chunk.js","7e23d2eb82d61276c9601a463ce0f2ee"],["static/js/4.ed3610f7.chunk.js","690f9ec02f84b829f24779bed70265cb"],["static/js/5.6164cbf1.chunk.js","b729647fc8bd5179a0b7986351495fcc"],["static/js/6.fef1a90d.chunk.js","22e31bcbba6699d17d0c91ea702f8768"],["static/js/7.14176592.chunk.js","c3c120707185144073d632022a479c27"],["static/js/8.7f79c97e.chunk.js","f4252cb419a77de2a997658488e4cba6"],["static/js/9.5e1e294b.chunk.js","bacac1cedabbad4e12f3f43e18771945"],["static/js/main.edcb298a.js","7fef7b202f3b17474d49cbc59cc1fd37"],["static/media/bg-login.e3347162.png","e33471629415c521f7ab25608d016801"],["static/media/chart.bfd1f800.png","bfd1f800299178f0c950ecfcf2577dcf"],["static/media/empty.c623cf53.png","c623cf53cc419d82864a9cb7bda75d2c"],["static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["static/media/im_armaruim.9df36230.png","9df362306b1169ed461ae9a4d21086c8"],["static/media/password.abba8ff2.png","abba8ff21e640f724a324e16e86ebf08"],["static/media/user.75c8e9b9.png","75c8e9b93ea03721882ac7b60298440c"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);a=urlsToCacheKeys.has(t);a||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("./index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});