define(function(require) {
	return {
		"move": function(x, y) {
			return function(obj) {
				obj.position.x += x;
				obj.position.y += y;
			};
		},

		"throw": function(x, y) {
			// set target mode
			// if in target mode, throw
		},

		"pluck": function(x, y) {
			// look around nearby, pluck random closest from candidates
		},

		"wait": function() {
			return function(obj) {
				// do nothing
			};
		}
	}
})