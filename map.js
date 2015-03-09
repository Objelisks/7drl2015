define(function(require) {
	var generate = function() {
		var walls = {};
		var map = new ROT.Map.Cellular(80, 40);
		map.randomize(0.45);
		var iters = 4;
		for (var i = 0; i < iters; i++) {
			map.create();
		};
		map.create(function(x, y, value) {
			if(value === 1) {
				walls[x + ',' + y] = true;
			}
		});
		return walls;
	};

	var passMap = function(x, y) {
		return this[x+','+y] !== true;
	};

	var pathfind = function(map, x1, y1, x2, y2, callback) {
		var index = x1 + ',' + y1;
		map.dijkstra[index] = (map.dijkstra[index]) ? map.dijkstra[index] : new ROT.Path.Dijkstra(x1, y1, passMap.bind(map.tiles), {topology:4});
		map.dijkstra[index].compute(x2, y2, callback);
	};

	return {
		"generate": generate,
		"pathfind": pathfind
	}
});