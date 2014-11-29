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
	beforeFilter: ['json'],

	login: function*(params){
		this.status = 401

		if(!params.password || !params.username){
			this.body = {
				error: "All fields are required"
			};
			return 
		}

		var user = yield User.findOne({'username': params.username});
		
		if(!user || false == (yield user.comparePassword(params.password))){
			this.body = {
				error: "Username or Password wrong"
			};
			return
		}

		this.session = {
			authorized: true,
			user_id: user.id
		}
		
		this.status = 200
	},

	logout: function*(params){
		this.session = null;
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
			this.status = 401;
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
	}
})	