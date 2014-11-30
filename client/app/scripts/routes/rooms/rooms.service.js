(function() {

    'use strict';

    angular
        .module('app')
        .factory('RoomsService', RoomsService);

    RoomsService.$inject = ['$http', 'config', '$q', 'localStorageService'];

    /**
     * Service for checking if the current user is authenticated
     */
    function RoomsService($http, config, $q, localStorageService) {

        var service = {
            urlAllRooms: '/rooms',
            urlFindRoom: '/room/get',
            urlSaveRoom: '/room',

            findNewRoom: findNewRoom,
            getAllRooms: getAllRooms,
            submitNewRoom: submitNewRoom
        };

        return service;

        ///////////////

        /**
         * Requests all available rooms from the server.
         * @return {promise}     [$q-promise]
         */
        function getAllRooms() {
            var q = $q.defer();

            // make the request
            $http({
                method: 'GET',
                url: config.apiUrl + service.urlAllRooms
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }

        /**
         * Submits a new room.
         * @param  {string}  name [Room name]
         * @return {promise}      [$q-promise]
         */
        function submitNewRoom(name) {
            var q = $q.defer();

            // make the request
            $http({
                method: 'POST',
                url: config.apiUrl + service.urlSaveRoom,
                data: {
                    name: name,
                    location: 'empty' //@todo real location
                }
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }

        /**
         * Finds a new room
         * @param  {int}    roomId [Room id]
         */
        function findNewRoom(roomId) {
            var q = $q.defer();

            // make the request
            $http({
                method: 'POST',
                url: config.apiUrl + service.urlFindRoom,
                data: {
                    roomid: roomId
                }
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }


    }


})();