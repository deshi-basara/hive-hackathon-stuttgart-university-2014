var Doc = Risotto.models.doc;
var Path = require('path');
var send = require('koa-send');

module.exports = Risotto.Controller.extend({
	serve: function*(params) {
		var id = ""+ parseInt(params.id);
		var path = Path.join(Risotto.APP, '..', 'uploads', id);
		yield send(this.koaContext, path);
	}
});