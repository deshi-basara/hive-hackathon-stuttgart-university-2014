module.exports = Risotto.Application.extend({
	title: 'Hive App',
	
	onAuthorizationError : function*(koaContext, next){
		koaContext.redirect('/');
	},

	/*
	onNotFoundError : function*(koaContext, next){
		console.log('app onNotFoundError')
	},
	*/
	/*onError : function*(koaContext, next){
		console.log('app error');
	}*/
});