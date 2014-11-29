(function() {

    'use strict';

    angular
        .module('app')
        .factory('SocketService', SocketService);

    SocketService.$inject = ['$http', 'config', '$q', 'localStorageService'];

    /**
     * Service for checking if the current user is authenticated
     */
    function SocketService($http, config, $q, localStorageService) {

        var service = {
            socket: null,

            connect: connect,
            getMsgs: getMsgs,
            getRoomInfo: getRoomInfo,
            joinRoom: joinRoom,
            submitMsg: submitMsg
        };

        return service;

        ///////////////

        /**
        * Connects to die sails.io.js WebSocket.
        */
        function connect() {
            var q = $q.defer();

            try {
                service.socket = io.connect(config.socketUrl);
                q.resolve();
            }
            catch(err) {
                q.reject();
            }

            return q.promise;
        }

        function getMsgs(cb) {
            service.socket.on('room:message', function(msgObj) {
                msgObj.type = 'msg';
                cb(msgObj);
            });
        }

        /**
         * Request all users from the specified room.
         * @param  {int}      roomId [Database room id]
         * @param  {function} cb     [Callback: user-array]
         */
        function getRoomInfo(roomId, cb) {
            // make request
            service.socket.emit('room:info', roomId);

            // wait for answers
            service.socket.on('room:info', function(userArray) {
                return cb(userArray);
            });
        }

        /**
         * Joins the room identified by its database id.
         * @param  {int}  roomId [Database room id]
         */
        function joinRoom(roomId) {
            service.socket.emit('room:join', roomId);
        }

        /**
         * Submits a msg to the the socket.
         * @param  {string} msg [Message string]
         */
        function submitMsg(msg) {
            service.socket.emit('room:message', msg);
        }






    }


})();