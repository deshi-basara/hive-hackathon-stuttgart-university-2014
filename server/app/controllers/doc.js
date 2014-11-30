var Doc = Risotto.models.doc;
var fs = require('fs');
var thunkify = require('thunkify');
var rename = thunkify(fs.rename);

module.exports = Risotto.Controller.extend({
	beforeFilter: ['authorize', 'user', 'json'],

	create: function*(params) {

		if(!params.roomid){
			console.log(params);
			this.status = 400
			return
		}

		try{
			var doc = yield Doc.create({
				room: params.roomid,
				owner: this.user.id
			});

			var file = params.files[0];
			if(file.mime !== 'application/pdf'){
				this.status = 400
				this.body = {
					error: 'Only pdf files are allowed'
				}
				return;
			}

			yield rename(file.path, Risotto.APP + '../uploads/' + doc.id);
			doc.file = file.filename;
			doc.save();
			this.body = doc
		} catch(err){
			Risotto.logger.error(err)
			this.status = 500
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