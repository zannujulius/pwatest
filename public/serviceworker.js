// cache is a stroage of the browser
// declare a name for your cache storage
const CACHE_NAME = "version-1";

// index.html is the file that will be rendered when
// page is online
// offline.html is the page that is rendered when the
// page is offline
// declare an array that will be file to render based on
// the network connection
const urslToCache = ["index.html", "offline.html"];

// the key word this  refers
// to the servicesworkerjs file
const self = this;

// install the sw
self.addEventListener("install", (event) => {
  // open the cache
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened Cache");
        // adds the url to the cache storage
        return cache.addAll(urslToCache);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

// listen for the request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // getting all the request to the for a page
    caches.match(event.request).then(() => {
      // fetch the lastest data from the response of
      //   the request
      return (
        fetch(event.request)
          // if it can't fetch upadate it means that there
          // is no internet connection
          .catch(() => {
            //   then we render the offline.html
            return caches.match("offline.html");
          })
      );
    })
  );
});

// activate the sw
self.addEventListener("activate", (event) => {
  // removing al the previous cache and activate the new one
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhiteList.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        )
      )
      .catch()
  );
});
