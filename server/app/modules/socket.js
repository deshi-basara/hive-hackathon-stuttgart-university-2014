var http = require('http');
var fs = require('fs');
var co = require('co');
var cookieHelper = require('../helpers/cookieHelper');


/**
 * Expose the socket Api
 */
var socket = Risotto.socket = {};

/**
 *
 */
var io; 


/**
 * holds the visible room list
 *
 */
 var rooms = {}

/**
 * Init
 * @param {app} app
 * @param {Function} done
 */
exports.initialize = function( app ){
    return function(fn) {

    	// create an own http server for our socket
    	var socketServer = http.createServer();

    	// initiate the socket
		io = Risotto.socket.io = require('socket.io').listen(socketServer);

		// start listeing for connections on the port
		socketServer.listen(Risotto.config.socket.port);

		Risotto.logger.log("Socket listening :" + Risotto.config.socket.port);

    	// register all socket events
    	socket.registerEvents();

		fn();
    };
};

/**
 * Register all important socket events.
 */

socket.registerEvents = function() {
	io.on('connection', function(client) {
		getUser(client, function(err, user){
			if(err){
				return Risotto.logger.warn('Non authorized user connected to socket');
			}
			bindClient(client, user);
		});
	});
};

/**
 * Bind user events
 */
function bindClient(client, user){
	/**
	 * room:create
	 * @param {String} room
	 */

	client.on('room:create', function(){
		// Risotto.models.
	});

	/**
	 * room:join 
	 * @param {String} room
	 */
	client.on('room:join', function(room){
		if(room in rooms){
			//send new user list
			io.to(room).emit('room:user', []);
			client.join(room);
		}
	});

	/**
	 * remove client from all rooms
	 */
	client.on('disconnect', function(){

	});

	client.on('room:leave', function(){

	})
}

/**
 * creates a room 
 */

socket.joinRoom = function(){

};


function getUser(client, cb){
	var cookie =  cookieHelper.get(client, 'koa:sess');
	var signedCookie = cookieHelper.get(client, 'koa:sess', Risotto.config.http.session.secret);

	if(signedCookie){
		cookie = signedCookie;
	}

	if(!cookie){
		return cb(new Error('Not authorized'));
	}

	var session = JSON.parse(new Buffer(cookie, 'base64').toString('utf8'));

	Risotto.models.user.findOne({id: session.user_id}, cb);
}





