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

            connect: connect
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
                alert('Es konnte keine Verbindung zum WebSocket hergetsellt werden');
                q.reject();
            }

            return q.promise;
        }






    }


})();