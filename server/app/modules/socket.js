var http = require('http');
var fs = require('fs');
var co = require('co');

/**
 * Expose the socket Api
 */
var socket = Risotto.socket = {};

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
		Risotto.socket.io = require('socket.io').listen(socketServer);

		// start listeing for connections on the port
		socketServer.listen(Risotto.config.socket.port);

		Risotto.logger.log("Socket listening :" + Risotto.config.socket.port);

    	// register all socket events
    	//socket.registerEvents();

		fn();
    };
};

/**
 * Register all important socket events.
 */
socket.registerEvents = function() {

	Risotto.socket.io.on('connection', co(function*(socket) {

		console.log('connected');

		// responde with the current ticket count
		//socket.emit('init-count', {count: count});
	}));
};

/**
 * Subtract newly ordered tickets from the ticket-count and update the ticket-counter.
 * Is called by users that return after their order was paid.
 * @param  {[int]} orderTicketCount [number of tickets the user has ordered]
 */
socket.ticketOrder = function*(orderTicketCount) {
	// get the current ticketCount value from redis
	try {
		var currentCount = yield Risotto.redis.get('xxx-ticketing:count');

		// subtract the orderTicketCount
		var newCount = currentCount - orderTicketCount;

		// update the currentTicketCount
		Risotto.redis.set('xxx-ticketing:count', newCount);

	} catch(err) {
		return console.log(err);
	}

	// send an update event to all connected sockets
	Risotto.socket.io.sockets.emit('update-count', {count: newCount});
};

/**
 * Changed the current ticket-count and ticket-counter to the handed value.
 * Is called by admins from the admin-interface.
 * @param  {[int]} newTicketCount [new ticket count]
 */
socket.adminOrder = function(newTicketCount) {
		// insert the ticketCount into redis
		Risotto.redis.set('xxx-ticketing:count', parseInt(newTicketCount));

		// send an update event to all connected sockets (as error-count, for reloading the page)
		Risotto.socket.io.sockets.emit('error-count');
};
