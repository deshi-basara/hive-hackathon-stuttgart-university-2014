var User = Risotto.models.user;
var thunkify = require('thunkify');
	User.create = thunkify(User.create);

/**
 * Validates hfu email address.
 */

function isValidEmail(email){
	return /(.+)\.(.+)\@hs\-furtwangen\.de/.test(String(email));
}

module.exports = Risotto.Controller.extend({

	login: function*(params){
		if(!params.password || !params.email){
			return yield this.render('user/loginForm', {error: 'Bitte alle Felder ausfüllen'});
		}

		var user = yield User.findOne({'email': params.email});
		
		if(!user || false == (yield user.comparePassword(params.password))){
			return yield this.render('user/loginForm', {error: 'Email oder Passwort falsch'});
		}

		this.session = {
			authorized: true,
			user_id: user.id
		}

		//user.signInCount = user.signInCount + 1;
		//yield user.save();
	
		this.redirect('/');
	},

	logout: function*(params){
		this.session = null;
		this.redirect('/');
	},


	/**
	 * [POST] user/register
	 */

	register: function*(params){
		/* 	
			check(params.password, String);
			check(params.email, String);
			check(params.username, String);
			check(params.picture);
		*/

		if(!params.password || !params.email || !params.username || !params.role ){
			//this.status = 403;
			this.body = {
				error: "All fields are required"
			};
			return 
		}

		var values = params.take('password', 'email', 'username', 'role');

		try{
			var user = yield User.create(values);
		} catch(err){
			Risotto.logger.error(err);
			this.status = 500;
			this.body = {
				error: "Server Error"
			};
			return 
		}

		// login & save id
		this.session = {
			authorized: true,
			user_id: user.id
		}

		this.status = 200;
		this.body = {}
	}
})	