define(function(require) {

	var display = require('display');
	var mapUtil = require('map');

	var clamp = function(x, min, max) {
		return Math.min(max, Math.max(min, x))
	}

	var Pickman = function(map, x, y, color) {
		this.followTarget = null;
		this.idleTimer = 0;
		this.color = color;
		this.position = {x:x, y:y};
		this.group = null;
		this.map = map;
	}

	Pickman.RED = "#f00";
	Pickman.BLUE = "#00f";
	Pickman.YELLOW = "#ff0";

	var groupCohereWeight = 0.8;
	var groupRepelWeight = 0.6;
	var maxSpeed = 0.8;

	Pickman.prototype.ai = function() {
		if(this.group) {
			var avg = {x: 0, y: 0};
			var avgTotal = 0;
			var repel = {x: 0, y: 0};
			var self = this;
			this.group.members.forEach(function(member) {
				var weight = 0.3;
				if(member === self) return;
				if(self.group.leader === member) {
					weight = 1.0;
				}

				avg.x += member.position.x * weight;
				avg.y += member.position.y * weight;
				avgTotal += weight;
				var dsq = Math.pow(self.position.x - member.position.x, 2) 
						+ Math.pow(self.position.y - member.position.y, 2);
				repel.x += (self.position.x - member.position.x) / (dsq + 1);
				repel.y += (self.position.y - member.position.y) / (dsq + 1);
			});
			avg.x /= avgTotal;
			avg.y /= avgTotal;
			var movement = {
				x: -(this.position.x - avg.x) * groupCohereWeight + repel.x * groupRepelWeight,
				y: -(this.position.y - avg.y) * groupCohereWeight + repel.y * groupRepelWeight
			};

			var path = [];
			var pathCallback = function(x, y) {
				path.push({x:x, y:y});
			};
			var targetPos = {x: Math.round(this.group.leader.position.x), y: Math.round(this.group.leader.position.y)};
			if(this.map.tiles[targetPos.x+','+targetPos.y] !== true) {
				mapUtil.pathfind(this.map, Math.round(this.position.x), Math.round(this.position.y),
					Math.round(this.group.leader.position.x), Math.round(this.group.leader.position.y), pathCallback);
				var dotScale = 1.0;
				if(path.length > 3) {
					var nextCell = path[path.length-3];
					// compare direction to next cell with planned movement direction
					// assume next cell dir is perpendicular to movement and scale both by dot product / inverse
					dotScale = (nextCell.x - this.position.x) * movement.x + (nextCell.y - this.position.y) * movement.y;

					var xDiff = (nextCell.x - self.position.x);
					var yDiff = (nextCell.y - self.position.y);
					var cellDistance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

					movement.x = movement.x * Math.max(0, dotScale) + (nextCell.x - self.position.x) * 1.0/cellDistance;
					movement.y = movement.y * Math.max(0, dotScale) + (nextCell.y - self.position.y) * 1.0/cellDistance;
				}				
			}


			var len = Math.sqrt(movement.x * movement.x + movement.y * movement.y);
			var scale = 1.0;
			if(len > maxSpeed) {
				scale = scale / len * maxSpeed;
			}

			this.position.x += movement.x * scale;
			this.position.y += movement.y * scale;
		} else {
			// idle movement
			if(Math.random() > 0.95) {
				this.position.x += Math.round(Math.random() * 2) - 1;
			}
			if(Math.random() > 0.95) {
				this.position.y += Math.round(Math.random() * 2) - 1;
			}
		}
	}

	Pickman.prototype.act = function() {
		this.ai();
		display.draw(this.position.x, this.position.y, "o", this.color);
	}

	var PickmanGroup = function() {
		this.members = [];
		this.leader = null;
	}

	PickmanGroup.prototype.add = function(member) {
		this.members.push(member);
		member.group = this;
	}

	PickmanGroup.prototype.addLeader = function(member) {
		this.members.push(member);
		member.group = this;
		this.leader = member;
	}

	return {
		Pickman: Pickman,
		PickmanGroup: PickmanGroup
	};
});