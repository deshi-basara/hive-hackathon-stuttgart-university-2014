var Annotation = Risotto.models.annotation;

module.exports = Risotto.Controller.extend({
	beforeFilter: ['authorize', 'user', 'json'],

	// from here on
	create: function*(params) {
		if(!params.page || !params.x || !params.y || !params.content || !params.docid){
			this.status = 400
			return
		}

		try{
			yield Annotation.create({
				owner: this.user.id,
				doc: params.docid,
				page: params.page,
				x: params.x,
				y: params.y,
				content: params.content
			});
		} catch(err){
			this.status = 400
			this.body = {
				error: err
			}
		}
	},

	// all annotations by document id
	allForDocument: function*(params){
		this.body = yield Annotation.find({ doc: params.docid }).populate('owner')
	}
});