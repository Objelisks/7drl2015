var display = new ROT.Display({width:80, height:40, bg:"#304030", fontStyle:"bold"});
document.body.appendChild(display.getContainer());


var input = document.createElement("input");
input.focus();
var keys = {};


var scheduler = new ROT.Scheduler.Simple();
var engine = new ROT.Engine(scheduler);

var map = {
	tiles: {},
	act: function() {
		console.log("frame");
		display.clear();
		Object.keys(this.tiles).forEach(function(key) {
			var parts = key.split(',');
			var x = parseInt(parts[0]);
			var y = parseInt(parts[1]);
			display.draw(x, y, "#");
		});
	}
};

map.tiles['0,0'] = true;
map.tiles['0,1'] = true;
map.tiles['1,0'] = true;
map.tiles['2,0'] = true;

var moveInput = function(obj) {
	window.addEventListener("keydown", obj);
};

var player = {
	x: 5,
	y: 5,
	act: function() {
		display.draw(this.x, this.y, "@");
		engine.lock();
		moveInput(this);
	},
	handleEvent: function(e) {
		var code = e.keyCode;
		switch(code) {
			case ROT.VK_RIGHT:
				this.x += 1;
				break;
			case ROT.VK_LEFT:
				this.x -= 1;
				break;
			case ROT.VK_UP:
				this.y -= 1;
				break;
			case ROT.VK_DOWN:
				this.y += 1;
				break;
			default:
				return;
		}
		this.clearInput();
	},
	clearInput: function() {
		window.removeEventListener("keydown", this);
		engine.unlock();
	}
};

scheduler.add(player, true);
scheduler.add(map, true);

engine.start();

// game loop
// entities
// tilemap
// items
// key bindings
// movement

// text boxes
// ui elements
// colored text
// multitile characters
// particle effects
// swarming