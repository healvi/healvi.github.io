importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
  if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/registerswf.js', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/pages/KlasemenLiga.html', revision: '1' },
    { url: '/pages/Match.html', revision: '1' }
  ],
  {
    // Ignore all URL parameters.
   ignoreUrlParametersMatching: [/.*/]
  });

workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
  );

workbox.routing.registerRoute(
    new RegExp('/js/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'js'
      })
  );

workbox.routing.registerRoute(
    new RegExp('/images/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'images'
      })
  );

workbox.routing.registerRoute(
    new RegExp('/images/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'images'
      })
  );

workbox.routing.registerRoute(
    new RegExp('/css/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'css'
      })
  );
workbox.routing.registerRoute(
    new RegExp('.(?:woff|woff2)$'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'font'
      })
  );

  workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'api',
    })
  );
  workbox.routing.registerRoute(
    /^https:\/\/fonts.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/MU.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});