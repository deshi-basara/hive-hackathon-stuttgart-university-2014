var _ = require("underscore");

function Params() {}

Params.prototype.set = function(obj) {
	for (var key in obj) {
		this[key] = _.clone(obj[key]);
	}
};

Params.prototype.setFile = function(file){
	if(!this.files){this.files = []}
	this.files.push(file);
};


Params.prototype.take = function(/** args */){
	var taken = {};

	[].forEach.call(arguments, function(key){
		taken[key] = _.clone(this[key]);
	}, this);

	return taken;
};

module.exports = Params;