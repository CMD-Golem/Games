self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(
				[
					"./",
					"./elements/style/style.css"
				]
			);
		})
	);
});


self.addEventListener("fetch", e => {
	e.respondWith(
		caches.matches(e.request).then(response => {
			return response || fetch(e.request);
		})
	);
});