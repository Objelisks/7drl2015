define(function(require) {

var Pickman = require('./pickman').Pickman;
var PickmanGroup = require('./pickman').PickmanGroup;
var display = require('display');
var engine = require('engine');
var Player = require('player');

var input = document.createElement("input");
input.focus();
var keys = {};


var map = {
	tiles: {},
	act: function() {
		console.log("frame");
		display.clear();
		Object.keys(this.tiles).forEach(function(key) {
			var parts = key.split(',');
			var x = parseInt(parts[0]);
			var y = parseInt(parts[1]);
			display.draw(x, y, "░", "#3b3", "#420");
		});
	}
};

//mapjs.loadMap(map, 'testMap.json');

map.tiles['0,0'] = true;
map.tiles['0,1'] = true;
map.tiles['1,0'] = true;
map.tiles['2,0'] = true;


var player = new Player(10, 10);


var pgroup = new PickmanGroup();
var p1 = new Pickman(display, 5, 5, Pickman.RED);
var p2 = new Pickman(display, 6, 6, Pickman.BLUE);
var p3 = new Pickman(display, 6, 9, Pickman.YELLOW);

pgroup.add(p1);
pgroup.add(p2);
pgroup.add(p3);
pgroup.add(player);

engine.add(map, true);
engine.add(p1, true);
engine.add(p2, true);
engine.add(p3, true);
engine.add(player, true);

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

});