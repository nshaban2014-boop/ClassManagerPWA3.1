const CACHE_NAME="class-manager-pwa-v14-negative-form";
const APP_FILES=["./","./index.html","./style.css","./app.js","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(APP_FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE_NAME}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(function(c){if(c)return c;return fetch(e.request).then(function(r){if(r&&r.status===200&&new URL(e.request.url).origin===self.location.origin){var cp=r.clone();caches.open(CACHE_NAME).then(function(ca){ca.put(e.request,cp)})}return r}).catch(function(){return caches.match("./index.html")})}))});
