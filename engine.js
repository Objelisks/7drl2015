define(function(require) {

	var scheduler = new ROT.Scheduler.Simple();
	var engine = new ROT.Engine(scheduler);
	engine.add = scheduler.add.bind(scheduler);
	engine.remove = scheduler.remove.bind(scheduler);

	return engine;

});