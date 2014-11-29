var Room = Risotto.models.room;

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
				owner: this.user.id
			});
		} catch(err){
			this.status = 400
			this.body = {
				error: err
			}
		}
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