self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(
				[
					"./",
					"./settings.html",
					"./elements/javascript/sheep-game.js",
					"./elements/javascript/sheep-game-settings.js",
					"./elements/javascript/sheep-game-var.js",

					"./elements/pictures/sheeps/black_sheep.png",
					"./elements/pictures/sheeps/blue_sheep.png",
					"./elements/pictures/sheeps/brown_sheep.png",
					"./elements/pictures/sheeps/gray_sheep.png",
					"./elements/pictures/sheeps/green_sheep.png",
					"./elements/pictures/sheeps/purple_sheep.png",
					"./elements/pictures/sheeps/red_sheep.png",
					"./elements/pictures/sheeps/white_sheep.png",

					"./elements/pictures/clover.svg",
					"./elements/pictures/confirm.svg",
					"./elements/pictures/dice.svg",
					"./elements/pictures/goal.svg",
					"./elements/pictures/goal_bg.svg",
					"./elements/pictures/instructions.svg",
					"./elements/pictures/medal.svg",
					"./elements/pictures/path.svg",
					"./elements/pictures/restart.svg",
					"./elements/pictures/settings.svg",
					"./elements/pictures/wolf.svg",
					
					"./elements/style/sheep-game.css",
					"./elements/style/sheep-game-settings.css",
					"./elements/style/style.css"
				]
			);
		})
	);
});


self.addEventListener("fetch", e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		})
	);
});