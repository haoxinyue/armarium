"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","45d5af43e6cbf0d6a023342ecf14da3a"],["static/css/main.c1c18d04.css","e9acecac828a9248a2047100e6262402"],["static/js/0.55df127b.chunk.js","e435a065708fc44e233c92455ef11ac4"],["static/js/1.12321cdf.chunk.js","e2a2a5ccacd4612e87b778742761a03c"],["static/js/10.6d5bfc52.chunk.js","86256615390dcb202c25b2cf419d2404"],["static/js/11.3b0ae5a5.chunk.js","9b8fdf219494f8e948851a431647b538"],["static/js/12.6acda759.chunk.js","a1c9a5e86dd6871098a7c2de0a3a337e"],["static/js/13.16a18d54.chunk.js","984d0a59c2674bd52d31e6a37b6f084d"],["static/js/14.36556fbd.chunk.js","1f569d19f2b9f1b614746ef652266167"],["static/js/15.cc59d794.chunk.js","c43a66f1e99025e1005b10c4782795d9"],["static/js/16.d6b916f5.chunk.js","c2226ee7df9cf98853c11c852c175c8e"],["static/js/17.07b21d0a.chunk.js","046db6f1a2ac75b76b57caba33bd364c"],["static/js/2.6889e040.chunk.js","41d41cff36c9dc0803c278c07d4173c0"],["static/js/3.5d971d8e.chunk.js","b5fe7559eba7319bfbdf98322f081286"],["static/js/4.5870e4e2.chunk.js","64f17636bf8b5e3ea283baeac8c3664f"],["static/js/5.9a820491.chunk.js","99528b94b4c43166b18ba2328c727782"],["static/js/6.cc2490b3.chunk.js","3474c7823510c00b58396688607fdc99"],["static/js/7.78f098ce.chunk.js","61db78328bfd04ba4f839b092174fb2b"],["static/js/8.79129463.chunk.js","ad3045a2b5d0abaaa2eb47e8ef88a805"],["static/js/9.9245651b.chunk.js","869bcce6374e7ed437ab806960c5bcf6"],["static/js/main.e0e17f28.js","8c29045ea9c38c9b50221008b17afab4"],["static/media/bg-login.e3347162.png","e33471629415c521f7ab25608d016801"],["static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["static/media/im_armaruim.9df36230.png","9df362306b1169ed461ae9a4d21086c8"],["static/media/password.abba8ff2.png","abba8ff21e640f724a324e16e86ebf08"],["static/media/user.75c8e9b9.png","75c8e9b93ea03721882ac7b60298440c"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);t=urlsToCacheKeys.has(a);t||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("./index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});