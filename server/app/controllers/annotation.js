var Annotation = Risotto.models.annotation;
var Doc = Risotto.models.doc;

module.exports = Risotto.Controller.extend({
	beforeFilter: ['authorize', 'user', 'json'],

	// from here on
	create: function*(params) {
		if(!params.page || !params.x || !params.y || !params.content || !params.docid){
			this.status = 400
			return
		}

		var annotation;
		try{
			annotation = yield Annotation.create({
				owner: this.user.id,
				doc: params.docid,
				page: params.page,
				x: params.x,
				y: params.y,
				content: params.content
			});
		} catch(err){
			console.log(err);
			this.status = 400
			this.body = {
				error: err
			}
		}

		this.body = annotation;
		
		//broadcast annotation
		var doc = yield Doc.findOne({id: params.docid});
		Risotto.socket.sendAnnotationToRoom(doc.room, annotation);
	},

	// all annotations by document id
	allForDocument: function*(params){
		try{
			this.body = yield Annotation.find({ doc: params.docid }).populate('owner')
		} catch(err){
			console.log(err)
		}
	}
});