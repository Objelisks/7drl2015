define(function(require) {
	return {
		move: function(x, y) {
			return function(obj) {
				obj.position.x += x;
				obj.position.y += y;
			};
		}
	}
})