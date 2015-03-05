var display = new ROT.Display({width:80, height:40, bg:"#304030", fontStyle:"bold"});
document.body.appendChild(display.getContainer());


var engine = new ROT.Engine();

var delay = function(self, func, params, milli) {
	setTimeout(function() { func.apply(self, params); }, milli);
};

var draw = display.draw.bind(display);

delay(display, draw, [1, 1, "#"], 50);
delay(display, draw, [2, 1, "#"], 150);
delay(display, draw, [4, 4, "#"], 250);
delay(display, draw, [4, 5, "#"], 350);
delay(display, draw, [5, 4, "#"], 450);
delay(display, draw, [5, 5, "#"], 550);
delay(display, draw, [10, 2, "#"], 650);
delay(display, draw, [18, 5, "#"], 750);
delay(display, draw, [60, 10, "#"], 850);


delay(display, draw, [1, 1, " "], 1150);
delay(display, draw, [2, 1, " "], 1250);
delay(display, draw, [4, 4, " "], 1350);
delay(display, draw, [4, 5, " "], 1450);
delay(display, draw, [5, 4, " "], 1550);
delay(display, draw, [5, 5, " "], 1650);
delay(display, draw, [10, 2, " "], 1750);
delay(display, draw, [18, 5, " "], 1850);
delay(display, draw, [60, 10, " "], 1950);


// game loop
// entities
// tilemap
// items
// key bindings
// movement
