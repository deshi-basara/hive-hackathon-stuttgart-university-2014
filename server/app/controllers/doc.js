var Doc = Risotto.models.doc;

module.exports = Risotto.Controller.extend({
	beforeFilter: ['authorize', 'user', 'json'],

	create: function*(params) {
		if(!params.name || !params.path || !params.roomid){
			this.status = 400
			return
		}

		try{
			yield Doc.create({
				name: params.name,
				path: params.path,
				room: params.roomid,
				owner: this.user.id,
				deleted: false // hardcoded
			});
		} catch(err){
			console.log(err);
			this.status = 400
			this.body = {
				error: err
			}
		}
	},

	all: function*(params){
		this.body = yield Doc.find({}).populate('owner')
	},

	// get documents for a specified room
	allForRoom: function*(params){
		this.body = yield Doc.find({ room: params.roomid }).populate('owner')
	}
});