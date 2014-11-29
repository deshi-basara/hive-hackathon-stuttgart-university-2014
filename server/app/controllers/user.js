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
		 	
		/*check(params.password, String);
		check(params.email, String);
		check(params.username, String);
		check(params.role, String);*/

		if(!params.password || !params.username || !params.role ){

			// upload profile pic
			var file = params.files[0];
			if(file.mime !== 'image/jpeg'){
				this.status = 400
				this.body = {
					error: 'Only images are allowed'
				}
				return;
			}
			yield rename(file.path, Risotto.APP + '../uploads/' + doc.id);
			// endof upload profile pic

			this.status = 401;
			this.body = {
				error: "All fields are required"
			};
			return 
		}

		var already = yield User.findOne({'username': params.username});

		if(already){
			this.status = 401
			this.body = {
				error: "There´s already a user with that username"
			}
			return
		}

		var values = params.take('password', 'username', 'role');

		try{
			var user = yield User.create(values);
		} catch(err){
			Risotto.logger.error(err);
			this.status = 500;
			this.body = {
				error: err
			};
			return 
		}

		// login & save id
		this.session = {
			authorized: true,
			user_id: user.id
		}
	},

	all: function*(params){
		this.body = yield User.find({})
	},

	isCurrentUserProf: function*(params){
		var currentUser = yield Risotto.models.user.findOne({id: this.session.user_id});
		this.body = (currentUser.role === 'prof')
	}
})	