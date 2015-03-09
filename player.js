define(function(require) {

	var display = require('display');
	var engine = require('engine');
	var actions = require('actions');


	var keyMapping = {};

	// arrow keys / numpad / vi: movement
	keyMapping[ROT.VK_RIGHT] = actions.move(1, 0),
	keyMapping[ROT.VK_NUMPAD6] = actions.move(1, 0);
	keyMapping[ROT.VK_LEFT] = actions.move(-1, 0);
	keyMapping[ROT.VK_NUMPAD4] = actions.move(-1, 0);
	keyMapping[ROT.VK_UP] = actions.move(0, -1);
	keyMapping[ROT.VK_NUMPAD8] = actions.move(0, -1);
	keyMapping[ROT.VK_DOWN] = actions.move(0, 1);
	keyMapping[ROT.VK_NUMPAD2] = actions.move(0, 1);
	keyMapping[ROT.VK_NUMPAD7] = actions.move(-1, -1);
	keyMapping[ROT.VK_NUMPAD9] = actions.move(1, -1);
	keyMapping[ROT.VK_NUMPAD1] = actions.move(-1, 1);
	keyMapping[ROT.VK_NUMPAD3] = actions.move(1, 1);

	// space: wait
	keyMapping[ROT.VK_SPACE] = actions.wait();

	// i: switch active color

	// o: throw

	// p: pluck


	var Player = function(x, y) {
		this.position = {x: x, y: y};
	};

	Player.prototype.act = function() {
		display.draw(this.position.x, this.position.y, "@");
		engine.lock();
		window.addEventListener("keydown", this);
	};

	Player.prototype.handleEvent = function(e) {
		var code = e.keyCode;
		var action = keyMapping[code];
		if(action) {
			action(this);
			window.removeEventListener("keydown", this);
			engine.unlock();
		}
	};

	return Player;
});