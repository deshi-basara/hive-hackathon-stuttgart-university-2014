module.exports = {
	http : {
		port : 8081,
		respondWith : 'html',
		statics : 'app/public/',
		session : {
			secret : ''
		},
		logger : 'HTTP :remote-addr :method :url :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
	},

	socket: {
		hostname: 'dreix.events',
		port: 9002
	},

	redis : {

	},

	logger : {
		levels : {
			console : 0,
			file : 3
		}
	},

	waterline: {
		connections: {
			mysql: {
			  adapter: 'mysql',
			  host: 'localhost',
			  database: 'hive-dev',
			  user: 'hive',
			}
		},
		defaults: {
			migrate: 'alter'
		}
	}
};
