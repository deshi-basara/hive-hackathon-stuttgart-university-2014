var Room = Risotto.models.room;
var map = require('../helpers/generatorMap');

module.exports = Risotto.Controller.extend({
	beforeFilter: ['authorize', 'user', 'json'],

	create: function*(params) {
		if(!params.name || !params.location){
			this.status = 400
			return
		}

		try{
			yield Room.create({
				name: params.name,
				location: params.location,
				owner: this.user.id,
				visible: true // change
			});
		} catch(err){
			console.log(err);
			this.status = 400
			this.body = {
				error: err
			}
		}
	},

	find: function*(params){
		var room = yield Room.findOne({id:params.roomid}).populate('owner')
		room.active = Risotto.socket.getActiveUserForRoom(params.roomid);
		yield map(room.active, function*(username){
			var user = yield Risotto.models.user.findOne({username: username});
			return user.toJSON();
		});

		this.body = room.toJSON();
	},

	all: function*(params){
		this.body = yield Room.find({}).populate('owner')
	},

	listForUser: function*(params){
		this.body = yield Room.find({ owner: this.user.id }).populate('owner')
	},

	listForLocation: function*(params){
		if(!params.location){
			this.status = 400
			return
		}

		//impl
	}
});