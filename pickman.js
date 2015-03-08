define(function(require) {

	var Pickman = function(display, x, y, color) {
		this.display = display;
		this.followTarget = null;
		this.idleTimer = 0;
		this.color = color;
		this.position = {x:x, y:y};
		this.group = null;
	}

	Pickman.RED = "#f00";
	Pickman.BLUE = "#00f";
	Pickman.YELLOW = "#ff0";

	var groupCohereWeight = 0.3;
	var groupRepelWeight = 0.4;

	Pickman.prototype.ai = function() {
		if(this.group) {
			// average group position
			// move towards center of group
			// add weighted repulsion 1/d2
			// add strong repulsion center
			var avg = {x: 0, y: 0};
			var avgTotal = 0;
			var repel = {x: 0, y: 0};
			var self = this;
			this.group.members.forEach(function(member) {
				var weight = 0.1;
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
			console.log(avg, repel);
			this.position.x += -(this.position.x - avg.x) * groupCohereWeight + repel.x * groupRepelWeight;
			this.position.y += -(this.position.y - avg.y) * groupCohereWeight + repel.y * groupRepelWeight;
			console.log(this.position.x, this.position.y);
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
		this.display.draw(this.position.x, this.position.y, "o", this.color);
	}

	var PickmanGroup = function() {
		this.members = [];
		this.leader = null;
	}

	PickmanGroup.prototype.act = function() {

	};

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