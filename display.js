define(function(require) {
	var display = new ROT.Display({width:80, height:40, bg:"#240", fontStyle:"bold"});

	document.body.appendChild(display.getContainer());

	return display;
});