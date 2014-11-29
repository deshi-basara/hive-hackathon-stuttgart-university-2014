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

	list: function*(params){
		this.body = yield Room.find({})
	}
});